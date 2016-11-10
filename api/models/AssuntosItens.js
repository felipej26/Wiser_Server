/**
 * AssuntosItens.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
    tableName: 'assuntos_itens',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	
	attributes: {
		linguagem: {
			model: 'Linguagem',
			required: true
		},
		
		assunto: {
		    model: 'Assuntos',
			required: true
		},

        item: {
            type: 'string',
			required: true,
			size: 500
        },

		toJSON: function() {
			var obj = this.toObject();

			delete obj.id;
			delete obj.linguagem;
			delete obj.assunto;
			
			return obj.item;
		}
	}
};

