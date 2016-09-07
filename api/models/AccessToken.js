/**
 * AccessToken.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	attributes: {
		accessToken: {
            type: 'string',
            size: 50
        },

        appID: {
            type: 'string',
            size: 20
        },

        userID: {
            type: 'string',
            size: 20
        },
        
        permissions: {
            type: 'string',
            size: 100
        },

        toJSON: function() {
            var obj = this.toObject();

            delete obj.id; 
            delete obj.createdAt;
            delete obj.updatedAt;

            return obj;
        }
	}
};