/**
 * UsuarioController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	updateOrCreate: function(req, res) {
        
        if (!req.param('nome') || 
            !req.param('primeiro_nome') || 
            !req.param('data_nascimento') || 
            !req.param('facebook_id') || 
            !req.param('access_token') || 
            !req.param('data_ultimo_acesso') || 
            !req.param('latitude') || 
            !req.param('longitude')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros invalidos (nome, primeiro_nome, data_nascimento, facebook_id, ' +
                    'access_token, data_ultimo_acesso, latitude, longitude)'
            });
        }

        var facebook_id = req.param('facebook_id');

        var values = {
            nome: req.param('nome'),
            primeiro_nome: req.param('primeiro_nome'),
            data_nascimento: req.param('data_nascimento'),
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
                nome: values.nome,
                primeiro_nome: values.primeiro_nome,
                data_nascimento: values.data_nascimento,
                access_token: values.access_token,
                data_ultimo_acesso: values.data_ultimo_acesso,
                latitude: values.latitude,
                longitude: values.longitude,
                conta_ativa: true
            }).then(function (updatedUsuario) {
                Usuario.findOne({
                    id: usuario.id
                }).exec(function(err, usuario) {
                    if (err) { return res.serverError(err); }

                    return res.json(usuario);
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

        if (!req.param('id') || !req.param('idioma') || !req.param('fluencia') || req.param('status') == 'undefined') {
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
            if (err) { return res.serverError(err); }
            
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
            if (err) { return res.serverError(err); }
            
            return res.json(usuario);
        });
    },
    
    procurarUsuarios: function(req, res) {
        var usuario = req.param('usuario');
        var latitude = req.param('latitude');
        var longitude = req.param('longitude');
        var idioma = req.param('idioma');

        if (!usuario || !latitude || !longitude || !idioma) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (usuario, latitude, longitude, idioma)'
            });
        }

        var query = 'SELECT u.*,' +
            ' ROUND(6371 * ACOS(SIN(' + latitude +
			' *PI()/180)*SIN(latitude*PI()/180) + COS( ' + latitude +
			' *PI()/180)*COS(latitude*PI()/180)*COS(longitude*PI()/180 -' + longitude +
			' *PI()/180)), 0) AS distancia,' +
            ' CASE WHEN (c.id IS NULL) THEN FALSE ELSE TRUE END AS isContato' +
            ' FROM usuario u' +
            ' LEFT JOIN contato c ON c.contato = u.id AND c.usuario = ' + usuario +
            ' WHERE conta_ativa = 1 AND setou_configuracoes = 1' +
            ' AND u.id <> ' + usuario +
            ' AND idioma IN (' + req.param('idioma') + ')';
        
        if (req.param('fluencia')) 
            query += ' AND fluencia IN (' + req.param('fluencia') + ')';

        query += ' ORDER BY distancia;';
        
        Usuario.query(query, function cb(err, usuarios) {
            if (err) { return res.serverError(err); }
            
            usuarios.forEach(function(usuario) {
                usuario.conta_ativa = usuario.conta_ativa !== 0 ;
                usuario.setou_configuracoes = usuario.setou_configuracoes !== 0;
                usuario.isContato = usuario.isContato !== 0;
            });
            
            return res.json(usuarios);
        });
    },

    carregarUsuarios: function(req, res) {
        
        if (!req.param('id') || !req.param('usuario')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros invalidos (id, usuario)'
            });
        }

        var id = req.param('id');
        var idUsuarios = req.param('usuario');

        Usuario.find({
            id: idUsuarios
        }).exec(function(err, usuarios) {
            if (err) { return res.serverError(err); }
            
            Contato.find({
                usuario: id,
                contato: idUsuarios
            }).exec(function(err, contatos) {
                usuarios.forEach(function(usuario) {
                    
                    usuario.isContato = false;

                    contatos.forEach(function(contato) {
                        if (contato.contato == usuario.id) {
                            usuario.isContato = true;
                        }
                    });
                });

                return res.json(usuarios);
            });
        });
    },

    carregarUsuario: function(req, res) {
        
        if (!req.param('id') || !req.param('usuario')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros invalidos (id, usuario)'
            });
        }

        var id = req.param('id');
        var usuario = req.param('usuario');

        Usuario.findOne({
            id: usuario
        }).exec(function(err, usuarioEncontrado) {
            if (err) { return res.serverError(err); }
            
            Contato.findOne({
                usuario: id,
                contato: usuario
            }).exec(function(err, contato) {
                if (err) { return res.serverError(err); }

                if (!contato) {
                    usuarioEncontrado.isContato = false;
                }
                else {
                    usuarioEncontrado.isContato = true;
                }

                return res.json(usuarioEncontrado);
            });
        });
    }
};

