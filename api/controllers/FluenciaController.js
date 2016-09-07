/**
 * FluenciaController
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getFluencias: function(req, res) {
        Fluencia.find({
            linguagem: req.param('linguagem')
        }).sort('nivel ASC')
        .exec(function callback(err, results) {
            res.json(results);
        });
    }
};

