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
                    if (err) { return res.json(err); }

                    res.json(discussao);
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
        .populate('usuario')
        .populate('respostas')
        .exec(function(err, discussoes) {
            if (err) { return res.json(err); }

            return res.json(discussoes);
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
        var usuario = req.param('usuario');

        if (!usuario) {
            Discussao.find().where({
                discussao_ativa: true
            })
            .populateAll()
            .sort('id DESC')
            .exec(function(err, discussoes) {
                if (err) { return res.json(err); }
                
                return res.json(discussoes);
            });
        }
        else {
            Discussao.find().where({
                usuario: usuario
            })
            .populateAll()
            .sort('id DESC')
            .exec(function(err, discussoes) {
                if (err) { return res.json(err); }

                return res.json(discussoes);
            });
        }
    }
};

