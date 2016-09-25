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
            .populate('mensagens', {
                where: {
                    id: {
                    '>': lastMensagem
                    }
                }
            })
            .exec(function (err, conversas) {
                if (err) { return res.serverError(err); }
                
                var idsContatos = [];
                
                conversas.forEach(function(conversa) {
                    conversa.usuarios.forEach(function(contato) {   
                        if (usuario != contato.usuario) {
                            idsContatos.push(contato.usuario);
                        }
                    });
                });

                Contato.find({
                    usuario: usuario,
                    contato: idsContatos
                }).exec(function(err, contatos) {
                    if (err) { return res.serverError(err); }
                    
                    conversas.forEach(function(conversa) {
                        conversa.usuarios.forEach(function(conContato) {
                            conContato.isContato = false;

                            contatos.forEach(function(contato) {
                                if (contato.contato == conContato.usuario) {
                                    conContato.isContato = true;
                                }
                            });
                        });
                    });
                    
                    return res.json(conversas);
                });
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

            return res.send('SUCCESS');
        });
    }
};

