/**
 * ConversaMensagem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	tableName: 'conversa_mensagem',

	attributes: {
		conversa: {
            model: 'Conversa',
            required: true
        },
        
        usuario: {
			model: 'Usuario',
			required: true
		},

		data: {
			type: 'datetime',
			required: true
		},
		
		lida: {
			type: 'boolean',
			required: true,
			defaultsTo: false
		},

		mensagem: {
			type: 'string',
			required: true,
			size: 250
		}
	}
};

