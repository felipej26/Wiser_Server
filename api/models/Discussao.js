/**
 * Discussao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	attributes: {
		usuario: {
			model: 'Usuario',
			required: true
		},
		
		titulo: {
			type: 'string',
			required: true,
			size: 30
		},
		
		descricao: {
			type: 'string',
			required: true,
			size: 250
		},
		
		data: {
			type: 'datetime',
			required: true
		},
		
		discussao_ativa: {
			type: 'boolean',
			defaultsTo: true
		},

		respostas: {
			collection: 'DiscussaoResposta',
			via: 'discussao',
			required: false
		}
	}
};