/**
 * DiscussaoController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    updateOrCreate: function(req, res) {
        if (!req.param('id') || !req.param('usuario') || !req.param('titulo') || 
            !req.param('descricao') || !req.param('data')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros invalidos (id, usuario, titulo, descricao, data)'
            });
        }

        var values = {
            id: req.param('id'),
            usuario: req.param('usuario'),
            titulo: req.param('titulo'),
            descricao: req.param('descricao'),
            data: req.param('data')
        };

        Discussao.findOrCreate({
            id: req.param('id')
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
                })
                .populate('usuario')
                .exec(function(err, discussao) {
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

        var criteria = {
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
        }

        carregarDiscussoesUsuarios(usuario, criteria)
        .then(function(discussoes) {
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
        })
        .then(function(resposta) {
            return DiscussaoResposta.findOne({id: resposta.id})
            .populate('usuario');
        })
        .then(function(respostaUsuario) {
            return res.json(respostaUsuario);
        })
        .catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    carregarDiscussoes: function(req, res) {
        
        if (!req.param('usuario') || req.param('minhasDiscussoes') == 'undefined') {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (usuario, minhasDiscussoes)'
            });
        }

        var usuario = req.param('usuario');
        var minhasDiscussoes = req.param('minhasDiscussoes') === 'true';
        var criteria = {};

        if (!minhasDiscussoes) {
            criteria = {
                discussao_ativa: true
            }
        }
        else {
            criteria = {
                usuario: usuario
            };
        }

        carregarDiscussoesUsuarios(usuario, criteria)
        .then(function(discussoes) {
            return res.json(discussoes);
        });
    }
};


function carregarDiscussoesUsuarios(usuario, criteria) {

    return Discussao.find().where(criteria)
    .populate('usuario')
    .populate('respostas')
    .sort('id DESC')
    .then(function(discussoes) {

        var idsContatos = [];
        var idsVerificarContatos = [];

        discussoes.forEach(function(discussao) {
            idsVerificarContatos.push(discussao.usuario.id);

            discussao.respostas.forEach(function(resposta) {
                idsContatos.push(resposta.usuario);
                idsVerificarContatos.push(resposta.usuario);
            });
        });
        
        var usuariosReposta = Usuario.find({
            id: idsContatos
        }).then(function(usuarios) {
            return usuarios;
        });

        var contatosResposta = Contato.find({
            usuario: usuario,
            contato: idsVerificarContatos
        }).then(function(c) {
            return c;
        });

        return [discussoes, usuariosReposta, contatosResposta];
    }).spread(function(discussoes, usuarios, contatos) {

        usuarios = sails.util.indexBy(usuarios, 'id');
        contatos = sails.util.indexBy(contatos, 'contato');

        discussoes.forEach(function(discussao) {
            discussao.usuario.isContato = typeof contatos[discussao.usuario.id] !== 'undefined';
            discussao.respostas = discussao.respostas.map(function(resposta) {
                resposta.usuario = usuarios[resposta.usuario];
                resposta.usuario.isContato = typeof contatos[resposta.usuario.id] !== 'undefined';
                return resposta;
            });
        });

        return discussoes;
    }).catch(function cb(err) {
        return err
    });
}
