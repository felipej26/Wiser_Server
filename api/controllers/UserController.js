/**
 * UserController
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	updateOrCreateUser: function(req, res) {
        var facebook_id = req.param('facebook_id');

        if (!facebook_id) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Facebook iD inválido: ' + facebook_id
            });
        }

        var values = {
            facebook_id: facebook_id,
            data_ultimo_acesso: req.param('data_ultimo_acesso'),
            latitude: req.param('latitude'),
            longitude: req.param('longitude')
        };

        User.findOrCreate({
            facebook_id: facebook_id
        }, values)
        .then(function cb(user) {
            
            User.update({
                id: user.id 
            }, {
                data_ultimo_acesso: values.data_ultimo_acesso,
                latitude: values.latitude,
                longitude: values.longitude,
                conta_ativa: true
            }).then(function (updatedUser) {
                User.findOne({
                    id: user.id
                }).exec(function(err, user) {
                    if (err) { return res.serverError(err); }

                    res.json(user);
                });
            });
        }).catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    salvarConfiguracoes: function(req, res) {
        var id = req.param('id');

        if (!id) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'ID inválido: ' + id
            });
        }
        
        User.update({
            id: id
        }, {
            idioma: req.param('idioma'),
            fluencia: req.param('fluencia'),
            status: req.param('status'),
            setou_configuracoes: true
        }).exec(function(err, user) {
            if (err) { return res.serverError(err); }
            
            return res.json(user);
        });
    },

    desativarConta: function(req, res) {
        var id = req.param('id');
        
        if (!id) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'ID inválido: ' + id
            });
        }
        
        User.update({
            id: id
        }, {
            conta_ativa: false
        }).exec(function(err, user) {
            if (err) { return res.serverError(err); }
            
            return res.json(user);
        });
    },

    encontrarUsuarios: function(req, res) {
        var id = req.param('id');
        var latitude = req.param('latitude');
        var longitude = req.param('longitude');
        var distancia = req.param('distancia');

        if (!id || !latitude || !longitude || !distancia) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Algum parametro esta invalido (ID, latitude, ' +
                    'longitude, distancia)'
            });
        }

        var query = 'SELECT id, ROUND(6371 * ACOS(SIN(' + latitude +
			' *PI()/180)*SIN(latitude*PI()/180) + COS( ' + latitude +
			' *PI()/180)*COS(latitude*PI()/180)*COS(longitude*PI()/180 -' + longitude +
			' *PI()/180)), 0) AS distancia' +
            ' FROM user' +
            ' WHERE conta_ativa = 1 AND setou_configuracoes = 1' +
            ' AND id <> \'' + id + '\'';

        if (req.param('idioma'))
            query += ' AND idioma = ' + req.param('idioma');
        
        if (req.param('fluencia')) 
            query += ' AND fluencia = ' + req.param('fluencia');

        query += ' HAVING distancia <= ' + distancia +
        ' ORDER BY distancia;';
        
        User.query(query, function cb(err, users) {
            if (err) {
                res.json(500, {
                    result: 'ERROR', 
                    reason: err
                });
            }
            else {
                var userIds = [];
                users.forEach(function(user) {
                    userIds.push(user.id);
                });

                User.find({
                    id: userIds
                }).exec(function (err, usersResult) {
                    if (err) { return res.serverError(err); }

                    return res.json(usersResult);
                });
            }
        });
    }
};

