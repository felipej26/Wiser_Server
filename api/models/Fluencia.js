/**
 * Fluencia.js
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
		
		nivel: {
			type: 'integer',
			required: true
		},
		
		descricao: {
			type: 'string',
			required: true,
			size: 30
		}
	}
};

