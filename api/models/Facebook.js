/**
 * Facebook.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	
	autoCreatedAt: false,
	autoUpdatedAt: false,

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
        }
	}
};