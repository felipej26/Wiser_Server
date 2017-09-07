/**
 * SistemaController
 *
 * @description :: Server-side logic for managing Sistemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getMinVersao: function(req, res) {
        Sistema.findOne({
            id: 1
        }).exec(function (err, versao){
            if (err) { return res.serverError(err); }

            if (!versao) {
                return res.notFound('Could not find versao!.');
            }
            
            return res.json(versao);
        });
    }
};

