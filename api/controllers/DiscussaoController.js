/**
 * DiscussaoController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    updateOrCreate: function(req, res) {
        var id = req.param('id');
        var titulo = req.param('titulo');
        var descricao = req.param('descricao');

        if (!id || !titulo || !descricao) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos!'
            });
        }

        var values = {
            id: id,
            usuario: req.param('usuario'),
            titulo: req.param('titulo'),
            descricao: req.param('descricao'),
            data: req.param('data')
        };

        Discussao.findOrCreate({
            id: id
        }, values)
        .then(function (discussao) {

            Discussao.update({
                id: discussao.id 
            }, {
                titulo: values.titulo,
                descricao: values.descricao,
                discussao_ativa: true
            }).then(function (updatedDiscussao) {
                Discussao.findOne({
                    id: discussao.id
                }).exec(function(err, discussao) {
                    if (err) { return res.serverError(err); }

                    return res.json(discussao);
                });
            });
        }).catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    procurarDiscussoes: function(req, res) {
        
        if (!req.param('usuario') || !req.param('chave')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (usuario, chave)'
            });
        }

        var usuario = req.param('usuario');
        var chave = req.param('chave');
        
        Discussao.find().where({
            or: [{
                id: chave
            }, {
                like: {
                    titulo: '%' + chave + '%'
                }
            }, {
                like: {
                    descricao: '%' + chave + '%'
                }
            }]
        })
        .populate('usuario', {
            where: {
                id: {
                    '!': usuario
                }
            }
        })
        .populate('respostas')
        .then(function(discussoes) {

            var idsContatos = [];

            discussoes.forEach(function(discussao) {
                if (usuario != discussao.usuario.id) {
                    idsContatos.push(discussao.usuario.id);
                }
            });

            Contato.find({
                usuario: usuario,
                contato: idsContatos
            }).exec(function(err, contatos) {
                if (err) { return res.serverError(err); }
                
                discussoes.forEach(function(discussao) {
                    discussao.usuario.isContato = false;

                    contatos.forEach(function(contato) {
                        if (contato.contato == discussao.usuario.id) {
                            discussao.usuario.isContato = true;
                        }
                    }); 
                });
                
                return res.json(discussoes);
            });
        }).catch(function(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    desativarDiscussao: function(req, res) {

        if (!req.param('id') || req.param('desativar') == 'undefined') {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (id, desativar)'
            });
        }

        var id = req.param('id');
        var desativar = req.param('desativar');

        Discussao.update({
            id: id
        }, {
            discussao_ativa: desativar
        }).then(function(discussao) {
            return res.json(discussao);
        }).catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    responderDiscussao: function(req, res) {
        var id = req.param('id');

        if (!id || !req.param('usuario') || !req.param('data') || !req.param('resposta')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (id, usuario, data, resposta)'
            });
        }

        DiscussaoResposta.create({
            discussao: id,
            usuario: req.param('usuario'),
            data: req.param('data'),
            resposta: req.param('resposta')
        }).exec(function(err, resposta) {
            if (err) { return res.json(err); }

            return res.json(resposta);
        });
    },

    carregarDiscussoes: function(req, res) {
        
        if (!req.param('usuario') || req.param('minhasDiscussoes') == 'undefined') {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (usuario)'
            });
        }

        var usuario = req.param('usuario');
        var minhasDiscussoes = req.param('minhasDiscussoes') == 'true';

        if (!minhasDiscussoes) {
            Discussao.find({
                discussao_ativa: true
            })
            .populate('usuario')
            .populate('respostas')
            .sort('id DESC')
            .exec(function(err, discussoes) {
                if (err) { return res.serverError(err); }
                
                var idsContatos = [];

                discussoes.forEach(function(discussao) {
                    if (usuario != discussao.usuario.id) {
                        idsContatos.push(discussao.usuario.id);
                    }
                });

                Contato.find({
                    usuario: usuario,
                    contato: idsContatos
                }).exec(function(err, contatos) {
                    if (err) { return res.serverError(err); }
                    
                    discussoes.forEach(function(discussao) {
                        discussao.usuario.isContato = false;

                        contatos.forEach(function(contato) {
                            if (contato.contato == discussao.usuario.id) {
                                discussao.usuario.isContato = true;
                            }
                        }); 
                    });

                    return res.json(discussoes);
                });
            });
        }
        else {
            Discussao.find().where({
                usuario: usuario
            })
            .populate('usuario')
            .populate('respostas')
            .sort('id DESC')
            .exec(function(err, discussoes) {
                if (err) { return res.serverError(err); }

                var idsContatos = [];

                discussoes.forEach(function(discussao) {
                    if (usuario != discussao.usuario.id) {
                        idsContatos.push(discussao.usuario.id);
                    }
                });

                Contato.find({
                    usuario: usuario,
                    contato: idsContatos
                }).exec(function(err, contatos) {
                    if (err) { return res.serverError(err); }
                    
                    discussoes.forEach(function(discussao) {
                        discussao.usuario.isContato = false;

                        contatos.forEach(function(contato) {
                            if (contato.contato == discussao.usuario.id) {
                                discussao.usuario.isContato = true;
                            }
                        }); 
                    });

                    return res.json(discussoes);
                });
            });
        }
    }
};

