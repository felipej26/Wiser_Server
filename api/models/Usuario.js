/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	attributes: {
		facebook_id: {
			type: 'string',
			size: 30,
			unique: true,
			required: true
		},
		
		data_ultimo_acesso: {
			type: 'datetime',
			required: true
		},
		
		latitude: {
			type: 'float',
			required: true
		},

		longitude: {
			type: 'float',
			required: true
		},

		idioma: {
			type: 'integer'
		},
		
		fluencia: {
			type: 'integer'
		},
		
		/*
		 * Apesar de ser 400, a aplicação permite apenas digitar 30 caracteres, 
		 * porém um emoticon ocupa 13 posições
		 */
		status: {
			type: 'string',
			size: 400
		},

		conta_ativa: {
			type: 'boolean',
			defaultsTo: true
		},

		setou_configuracoes: {
			type: 'boolean',
			defaultsTo: false
		}
	}
};