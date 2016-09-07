/**
 * DiscussaoController
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
            user: req.param('user'),
            titulo: req.param('titulo'),
            descricao: req.param('descricao'),
            data: req.param('data')
        };

        Discussao.findOrCreate({
            id: id
        }, values)
        .then(function cb(discussao) {

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
        .populate('user')
        .populate('respostas')
        .exec(function(err, discussoes) {
            if (err) return res.serverError(err);

            return res.json(discussoes);
        });
    },

    desativarDiscussao: function(req, res) {
        var id = req.param('id');

        if (!id) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos!'
            });
        }

        Discussao.update({
            id: id
        }, {
            discussao_ativa: false
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

        if (!id) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos!'
            });
        }

        DiscussaoResposta.create({
            discussao: id,
            user: req.param('user'),
            data: req.param('data'),
            resposta: req.param('resposta')
        }).exec(function(err, resposta) {
            if (err) return res.serverError(err);

            return res.json(resposta);
        });
    },

    carregarDiscussoes: function(req, res) {
        var user = req.param('user');

        if (!user) {
            Discussao.find()
            .populate('user')
            .populate('respostas')
            .sort('id DESC')
            .exec(function(err, discussoes) {
                if (err) return res.serverError(err);
                
                return res.json(discussoes);
            });
        }
        else {
            Discussao.find().where({
                user: user
            }).populate('user')
            .populate('respostas')
            .sort('id DESC')
            .exec(function(err, discussoes) {
                if (err) return res.serverError(err);

                return res.json(discussoes);
            });
        }
    }
};

