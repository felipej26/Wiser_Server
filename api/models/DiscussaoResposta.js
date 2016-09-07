/**
 * DiscussaoResposta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	tableName: 'discussao_resposta',
	
	attributes: {
		user: {
			model: 'User',
			required: true
		},
		
		discussao: {
			model: 'Discussao',
			required: true
		},
		
		data: {
			type: 'datetime',
			required: true
		},
		
		resposta: {
			type: 'string',
			required: true,
			size: 250
		}
	}
};

