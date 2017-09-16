/**
 * ConversaController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	carregarConversas: function(req, res) {
        
        if (!req.param('usuario') || !req.param('mensagem')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (usuario, mensagem)'
            });
        }
        
        var usuario = req.param('usuario');
        var lastMensagem = req.param('mensagem');

        ConversaUsuario.find({
            usuario: usuario
        })
        .exec(function (err, conversasusuario) {
            if (err) { return res.serverError(err); }

            var conversasIds = [];
            conversasusuario.forEach(function (conversa) {
                conversasIds.push(conversa.conversa);
            });

            Conversa.find({
                id: conversasIds
            })
            .populate('usuarios')
            .populate('mensagens', {
                where: {
                    id: {
                        '>': lastMensagem
                    }
                }
            })
            .then(function(conversas) {

                conversas.forEach(function(conversa) {
                    conversa.destinatario = conversa.usuarios[conversa.usuarios[0].usuario == usuario ? 1 : 0].usuario;
                });

                return res.json(conversas);
            })
            .catch(function cbError(err) {
                return res.json(500, {
                    result: 'BAD_REQUEST',
                    reason: err
                });
            });
        });
    },

    carregarConversa: function(req, res) {

        if (!req.param('usuario') || !req.param('destinatario')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (usuario, destinatario)'
            });
        }

        var usuario = req.param('usuario');
        var destinatario = req.param('destinatario');

        var query = 'SELECT * FROM conversa_usuario' +
        ' WHERE usuario = ' + destinatario + ' AND conversa IN (' +
        '     SELECT conversa FROM conversa_usuario' +
        '     WHERE usuario = ' + usuario +
        ' );';
        
        ConversaUsuario.query(query, function cb(err, conversa) {
            if (err) { return res.serverError(err); }
            
            if (!conversa || conversa.length == 0) {
                return adicionarConversa(usuario, destinatario, 0)
                .then(function(conversa) {
                    conversa.destinatario = destinatario;
                    return res.json(conversa);
                }).catch(function cbError(err) {
                    return res.json(500, {
                        result: 'BAD_REQUEST',
                        reason: err
                    });
                });
            }

            Conversa.findOne({
                id: conversa[0].conversa
            })
            .populate('mensagens')
            .then(function(c) {
                c.destinatario = destinatario;
                return res.json(c);
            });
        });
    },
    
    enviarMensagem: function(req, res) {
        
        if (!req.param('conversa') || !req.param('usuario') || !req.param('destinatario') ||
            !req.param('data') || !req.param('mensagem')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (conversa, usuario, destinatario, data, mensagem)'
            });
        }

        var idConversa = req.param('conversa');
        var idUsuario = req.param('usuario');
        var idDestinatario = req.param('destinatario');
        var data = req.param('data');
        var mensagem = req.param('mensagem');

        adicionarConversa(idUsuario, idDestinatario, idConversa)
        .then(function(conversa) {
            ConversaMensagem.create({
                conversa: conversa.id,
                usuario: idUsuario,
                data: data,
                mensagem: mensagem
            }).then(function (mensagem) {
                return res.json(mensagem);
            }).catch(function cbError(err) {
                return res.json(500, {
                    result: 'BAD_REQUEST',
                    reason: err
                });
            });
        }).catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    atualizarLidas: function(req, res) {

        if (!req.param('conversa') || !req.param('usuario') || !req.param('mensagem')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (conversa, usuario, mensagem)'
            });
        }

        var conversa = req.param('conversa');
        var usuario = req.param('usuario');
        var lastMensagem = req.param('mensagem');

        ConversaMensagem.update({
            lida: false,
            conversa: conversa,
            usuario: {
                '!': usuario
            },
            id: {
                '<=': lastMensagem
            }
        }, {
            lida: true
        }).exec(function (err, mensagens) {
            if (err) { return res.serverError(err); }

            return res.json(200, {
                result: 'OK',
                reason: 'Mensagens Atualizadas'
            });
        });
    }
};

function adicionarConversa(usuario, destinatario, conversa) {

    return Conversa.findOrCreate({
        id: conversa
    }).then(function (conversaEncontrada) {

        ConversaUsuario.findOrCreate({
            conversa: conversaEncontrada.id,
            usuario: usuario
        }, {
            conversa: conversaEncontrada.id,
            usuario: usuario
        }).then(function (conversa) {

        }).catch(function cbError(err) {
            return err;
        });

        ConversaUsuario.findOrCreate({
            conversa: conversaEncontrada.id,
            usuario: destinatario
        }, {
            conversa: conversaEncontrada.id,
            usuario: destinatario
        }).then(function (conversa) {
            
        }).catch(function cbError(err) {
            return err;
        });
        
        return conversaEncontrada;
    }).catch(function cbError(err) {
        return err;
    });
}