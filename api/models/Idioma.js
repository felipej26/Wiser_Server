/**
 * Idioma.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	attributes: {
		linguagem_id: {
			type: 'integer',
			required: true
		},
		
		cod_idioma: {
			type: 'integer',
			required: true
		},
		
		/*
		 * Indica que o idioma será mostrado nas Combos de Idiomas
		 */
		disponivel: {
			type: 'boolean',
			defaultsTo: false,
			required: true
		},

		descricao: {
			type: 'string',
			required: true,
			size: 30
		}
	}
};

