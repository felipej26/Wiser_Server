/**
 * Assuntos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	autoCreatedAt: false,
	autoUpdatedAt: false,

	attributes: {
        ordem: {
            type: 'integer',
            required: true
        },

		categoria: {
			type: 'string',
			required: true,
			size: 500
		},

		titulos: {
			collection: 'AssuntosTitulos',
			via: 'assunto'
		},

        subcategorias: {
            collection: 'AssuntosSubCategorias',
            via: 'assunto'
        },
		
		itens: {
			collection: 'AssuntosItens',
			via: 'assunto'
		}
	}
};

