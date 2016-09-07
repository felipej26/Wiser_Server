/**
 * IdiomaController
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getIdiomas: function(req, res) {
        Idioma.find({
            linguagem: req.param('linguagem')
        }).sort('cod_idioma ASC')
        .exec(function callback(err, results) {
            res.json(results);
        });
    }
};

