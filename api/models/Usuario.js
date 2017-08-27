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

		access_token: {
			type: 'string',
			required: true,
			size: 1000
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
		 * Lembrando que um Emoticon ocupa 13 de espaço
		 */
		status: {
			type: 'string',
			size: 1000
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