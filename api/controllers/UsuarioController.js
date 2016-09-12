/**
 * UsuarioController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	updateOrCreate: function(req, res) {
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

        Usuario.findOrCreate({
            facebook_id: facebook_id
        }, values)
        .then(function cb(usuario) {
            
            Usuario.update({
                id: usuario.id 
            }, {
                data_ultimo_acesso: values.data_ultimo_acesso,
                latitude: values.latitude,
                longitude: values.longitude,
                conta_ativa: true
            }).then(function (updatedUsuario) {
                Usuario.findOne({
                    id: usuario.id
                }).exec(function(err, usuario) {
                    if (err) { return res.json(err); }

                    res.json(usuario);
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
        
        Usuario.update({
            id: id
        }, {
            idioma: req.param('idioma'),
            fluencia: req.param('fluencia'),
            status: req.param('status'),
            setou_configuracoes: true
        }).exec(function(err, usuario) {
            if (err) { return res.json(err); }
            
            return res.json(usuario);
        });
    },

    desativarConta: function(req, res) {
        
        if (!req.param('id')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (id)'
            });
        }
        
        var id = req.param('id');

        Usuario.update({
            id: id
        }, {
            conta_ativa: false
        }).exec(function(err, usuario) {
            if (err) { return res.json(err); }
            
            return res.json(usuario);
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
            ' FROM usuario' +
            ' WHERE conta_ativa = 1 AND setou_configuracoes = 1' +
            ' AND id <> \'' + id + '\'';

        if (req.param('idioma'))
            query += ' AND idioma = ' + req.param('idioma');
        
        if (req.param('fluencia')) 
            query += ' AND fluencia = ' + req.param('fluencia');

        query += ' HAVING distancia <= ' + distancia +
        ' ORDER BY distancia;';
        
        Usuario.query(query, function cb(err, usuarios) {
            if (err) {
                res.json(500, {
                    result: 'ERROR', 
                    reason: err
                });
            }
            else {
                var usuarioIds = [];
                usuarios.forEach(function(usuario) {
                    usuarioIds.push(usuario.id);
                });

                Usuario.find({
                    id: usuarioIds
                }).exec(function (err, usuariosResult) {
                    if (err) { return res.serverError(err); }

                    return res.json(usuariosResult);
                });
            }
        });
    }
};

