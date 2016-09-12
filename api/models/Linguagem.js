/**
 * Linguagem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	attributes: {

        /*
         * Ex.: pt_br = Português
         *      en = Inglês
         */ 
		chave: {
			type: 'string',
			unique: true,
			required: true,
			size: 5
		},

		/*
		 *	Indica que a Linguaguem é a default caso não haja a correta
		 */ 
		is_default: {
			type: 'boolean',
			defaultsTo: false
		},

		/*
		 *	Indica que a Linguagem está disponivel no App
		 */
		disponivel: {
			type: 'boolean',
			defaultsTo: false
		}
	}
};

