/**
 * AssuntosSubCategorias.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	tableName: 'assuntos_subcategorias',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	attributes: {
		assunto: {
			model: 'Assuntos',
			required: true
        },

		subcategoria: {
			type: 'string',
			required: true,
			size: 500
		}
	}
};

