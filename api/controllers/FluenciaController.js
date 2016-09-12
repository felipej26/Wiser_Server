/**
 * FluenciaController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getFluencias: function(req, res) {

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
                Fluencia.find()
                .where({
                    linguagem_id: l.id
                })
                .sort('nivel ASC')
                .exec(function (err, fluencias) {
                    if (err) { return res.serverError(err); }

                    return res.json(fluencias);
                });
            }
            else {
                Fluencia.find()
                .where({
                    linguagem_id: l.id
                })
                .where({
                    nivel: { 
                        '>': 0
                    }
                })
                .sort('nivel ASC')
                .exec(function (err, fluencias) {
                    if (err) { return res.serverError(err); }

                    return res.json(fluencias);
                });
            }
        });
    }
};

