/**
 * AssuntosController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    carregarAssuntos: function(req, res) {
        
        if (!req.param('linguagem')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (linguagem)'
            });
        }
        
        var linguagem = req.param('linguagem');

        Linguagem.findOne({
            chave: linguagem
        })
        .exec(function(err, lingua) {
            if (err) { return res.serverError(err); }

            if (lingua === undefined) {
                return res.json(400, {
                    result: 'BAD_REQUEST',
                    reason: 'Parametros Inválidos (linguagem)'
                });
            }

            Assuntos.find()
            .populate('titulos', {
                where: {
                    linguagem: lingua.id
                }
            })
            .populate('subcategorias')
            .populate('itens', {
                where: {
                    linguagem: lingua.id
                }
            })
            .exec(function(err, assuntos) {
                if (err) { return res.serverError(err); }

                return res.json(assuntos);
            });
        });
    }
};