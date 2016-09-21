/**
 * DiscussaoResposta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	tableName: 'discussao_resposta',
	
	attributes: {
		usuario: {
			model: 'Usuario',
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
		
		/*
		 * Apesar de ser 3500, a aplicação permite apenas digitar 250 caracteres, 
		 * porém um emoticon ocupa 13 posições
		 */
		resposta: {
			type: 'string',
			required: true,
			size: 3500
		}
	}
};

