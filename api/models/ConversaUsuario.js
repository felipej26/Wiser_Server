/**
 * ConversaUsuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
    tableName: 'conversa_usuario',

    attributes: {
	    conversa: {
            model: 'Conversa',
            required: true
        },
        
        usuario: {
			model: 'Usuario',
			required: true
		},

        toJSON: function() {
            var obj = this.toObject();

            delete obj.conversa;

            return obj;
        }
    }
};

