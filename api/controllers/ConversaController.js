/**
 * ConversaController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	carregarConversas: function(req, res) {
        var usuario = req.param('usuario');

        if (!usuario) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (usuario)'
            });
        }
        
        ConversaUsuario.find({
            usuario: usuario
        })
        .exec(function (err, conversas) {
            if (err) { return res.serverError(err); }

            var conversasIds = [];
            conversas.forEach(function (conversa) {
                conversasIds.push(conversa.conversa);
            });

            Conversa.find({
                id: conversasIds
            })
            .populate('usuarios')
            .populate('mensagens')
            .exec(function (err, conversas) {
                if (err) { return res.serverError(err); }

                return res.json(conversas);
            });
        });
    },

    carregarEspecifico: function(req, res) {
        
        if (!req.param('usuario') || !req.param('destinatario')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (usuario, destinatario)'
            });
        }

        var usuario = req.param('usuario');
        var destinatario = req.param('destinatario');

        ConversaUsuario.find({
            usuario: usuario
        }).then(function(conversasUsuario) {
            
            if (!conversasUsuario[0]) {
                console.log('Chegou Aqui');

                return res.json(500, {
                    result: 'BAD_REQUEST',
                    reason: 'Usuario não possui conversas'
                });
            }

            return conversasUsuario;
        }).then(function(conversas) {

            var conversaEncontrada;
            var conversasIds = [];
            conversas.forEach(function(conversa) {
                conversasIds.push(conversa.id);
            });

            ConversaUsuario.findOne({
                conversa: conversasIds,
                usuario: destinatario
            }).then(function(cEncontrada) {
                Conversa.findOne({
                    id: cEncontrada.id
                })
                .populate('mensagens')
                .then(function (cConversa) {
                    return res.json(cConversa);
                }).catch(function (err) {
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
        }).catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
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

        Conversa.findOrCreate({
            id: idConversa
        }).then(function (conversa) {

            ConversaUsuario.findOrCreate({
                conversa: conversa.id,
                usuario: idUsuario
            }, {
                conversa: conversa.id,
                usuario: idUsuario
            }).then(function (conversa) {

            }).catch(function cbError(err) {
                return res.json(500, {
                    result: 'BAD_REQUEST',
                    reason: err
                });
            });

            ConversaUsuario.findOrCreate({
                conversa: conversa.id,
                usuario: idDestinatario
            }, {
                conversa: conversa.id,
                usuario: idDestinatario
            }).then(function (conversa) {
                
            }).catch(function cbError(err) {
                return res.json(500, {
                    result: 'BAD_REQUEST',
                    reason: err
                });
            });

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
    }
};

