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
                var idsUsuarios = [];

                conversas.forEach(function(conversa) {
                    idsUsuarios.push(conversa.usuarios[
                        conversa.usuarios[0].id == usuario ? 1 : 0
                    ].id);
                });

                var usuariosConversa = Usuario.find({
                    id: idsUsuarios
                })
                .then(function(usuarios) {
                    return usuarios;
                });

                var contatosConversa = Contato.find({
                    usuario: usuario,
                    contato: idsUsuarios
                })
                .then(function(contatos) {
                    return contatos
                });

                return [conversas, usuariosConversa, contatosConversa];
            })
            .spread(function(conversas, usuarios, contatos) {

                usuarios = sails.util.indexBy(usuarios, 'id');
                contatos = sails.util.indexBy(contatos, 'contato');

                conversas.forEach(function(conversa) {
                    var u = conversa.usuarios[conversa.usuarios[0].id == usuario ? 1 : 0].id;
                    conversa.destinatario = usuarios[u];
                    conversa.destinatario.isContato = typeof contatos[u] !== 'undefined';

                    delete conversa.usuarios;
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

        var query = 'SELECT * FROM conversa_usuario' +
        ' WHERE usuario = ' + req.param('destinatario') + ' AND conversa IN (' +
        '     SELECT conversa FROM conversa_usuario' +
        '     WHERE usuario = ' + req.param('usuario') +
        ' );';
        
        ConversaUsuario.query(query, function cb(err, conversa) {
            if (err) { return res.serverError(err); }
            
            if (!conversa || conversa.length == 0) {
                return res.notFound();
            }

            Conversa.findOne({
                id: conversa[0].conversa
            })
            .populate('mensagens')
            .then(function(c) {
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

            return res.json(200, {
                result: 'OK',
                reason: 'Mensagens Atualizadas'
            });
        });
    }
};

