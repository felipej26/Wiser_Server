/**
 * ConversaController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	carregarConversas: function(req, res) {
        var usuario = req.param('usuario');

        if (!usuario) {
            return res.json(400, {
                result: 'BAD_REQUEST',
                reason: 'Parametros Inválidos (usuario)'
            });
        }
        
        ConversaUsuario.find({
            usuario: usuario
        })
        .exec(function (err, conversas) {
            if (err) { return res.serverError(err); }

            var conversasIds = [];
            conversas.forEach(function (conversa) {
                conversasIds.push(conversa.conversa);
            });

            Conversa.find({
                id: conversasIds
            })
            .populate('usuarios')
            .populate('mensagens')
            .exec(function (err, conversas) {
                if (err) { return res.serverError(err); }

                return res.json(conversas);
            });
        });
    }
};

