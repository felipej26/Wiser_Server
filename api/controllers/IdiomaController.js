/**
 * IdiomaController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getIdiomas: function(req, res) {

        if (!req.param('linguagem') || !req.param('todos')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Invalidos (linguagem, todos)'
            });
        }

        var todos = req.param('todos') == 'true';
        var linguagem = req.param('linguagem');

        Linguagem.findOne()
        .where({
            disponivel: true
        })
        .where({
            or: [{
                chave: linguagem
            }, {
                is_default: true
            }]
        })
        .sort('is_default ASC')
        .exec(function (err, l) {
            if (err) { return res.serverError(err); }
            
            if (todos) {
                Idioma.find()
                .where({
                    linguagem_id: l.id
                })
                .where({
                    or: [{
                        disponivel: true
                    }, {
                        cod_idioma: 0
                    }]
                })
                .sort('cod_idioma ASC')
                .exec(function (err, idiomas) {
                    if (err) { return res.serverError(err); }

                    return res.json(idiomas);
                });
            }
            else {
                Idioma.find()
                .where({
                    linguagem_id: l.id
                })
                .where({
                    disponivel: true
                })
                .sort('cod_idioma ASC')
                .exec(function (err, idiomas) {
                    if (err) { return res.serverError(err); }

                    return res.json(idiomas);
                });
            }
        });
    }
};

