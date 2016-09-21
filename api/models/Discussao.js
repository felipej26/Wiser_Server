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
		
		/*
		 * Apesar de ser 400, a aplicação permite apenas digitar 30 caracteres, 
		 * porém um emoticon ocupa 13 posições
		 */
		titulo: {
			type: 'string',
			required: true,
			size: 400
		},
		
		/*
		 * Apesar de ser 3500, a aplicação permite apenas digitar 250 caracteres, 
		 * porém um emoticon ocupa 13 posições
		 */
		descricao: {
			type: 'string',
			required: true,
			size: 3500
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