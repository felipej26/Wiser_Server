/**
 * UsuarioController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	updateOrCreate: function(req, res) {
        
        if (!req.param('facebook_id') || !req.param('access_token') || !req.param('data_ultimo_acesso') || 
            !req.param('latitude') || !req.param('longitude')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros invalidos (facebook_id, access_token, data_ultimo_acesso, latitude, longitude)'
            });
        }

        var facebook_id = req.param('facebook_id');

        var values = {
            facebook_id: facebook_id,
            access_token: req.param('access_token'),
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
                access_token: access_token,
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

        if (!req.param('id') || !req.param('idioma') || !req.param('fluencia') || !req.param('status')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros invalidos (id, idioma, fluencia, status)'
            });
        }

        var id = req.param('id');
        
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
                reason: 'Parametros Invalidos (id, latitude, longitude, distancia)'
            });
        }

        var query = 'SELECT u.*, ROUND(6371 * ACOS(SIN(' + latitude +
			' *PI()/180)*SIN(latitude*PI()/180) + COS( ' + latitude +
			' *PI()/180)*COS(latitude*PI()/180)*COS(longitude*PI()/180 -' + longitude +
			' *PI()/180)), 0) AS distancia,' +
            ' CASE WHEN (c.id IS NULL) THEN FALSE ELSE TRUE END AS isContato' +
            ' FROM usuario u' +
            ' LEFT JOIN contato c ON c.contato = u.id AND c.usuario = ' + id +
            ' WHERE conta_ativa = 1 AND setou_configuracoes = 1' +
            ' AND u.id <> ' + id;

        if (req.param('idioma'))
            query += ' AND idioma = ' + req.param('idioma');
        
        if (req.param('fluencia')) 
            query += ' AND fluencia = ' + req.param('fluencia');

        query += ' HAVING distancia <= ' + distancia +
        ' ORDER BY distancia;';
        
        Usuario.query(query, function cb(err, usuarios) {
            if (err) { return res.serverError(err); }
            
            return res.json(usuarios);
        });
    }
};

