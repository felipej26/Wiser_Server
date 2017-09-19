/**
 * ContatoController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	adicionarContato: function(req, res) {

        if (!req.param('usuario') || !req.param('contato')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (usuario, contato)'
            });
        }

        var usuario = req.param('usuario');
        var contato = req.param('contato');

        Contato.findOrCreate({
            usuario: usuario,
            contato: contato
        }).then(function(contato){
            return res.json(contato);
        }).catch(function cbError(err) {
            return res.json(500, {
                result: 'BAD_REQUEST',
                reason: err
            });
        });
    },

    carregarContatos: function(req, res) {
        
        if (!req.param('usuario')) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (usuario)'
            });
        }

        Contato.find({
            usuario: req.param('usuario')
        })
        .populate('contato')
        .exec(function(err, contatos) {
            if (err) { return res.serverError(err); }
            
            var contatosFormatados = [];

            contatos.forEach(function(contato) {
                contato.contato.isContato = true;
                contatosFormatados.push(contato.contato);
            });
            
            return res.json(contatosFormatados);
        });
    }
};

