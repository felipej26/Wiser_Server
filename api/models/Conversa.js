/**
 * Conversa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	attributes: {
		usuarios: {
			collection: 'ConversaUsuario',
			via: 'conversa',
			required: false
		},

		mensagens: {
			collection: 'ConversaMensagem',
			via: 'conversa',
			required: false
		}
	}
};

