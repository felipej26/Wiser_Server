/**
 * Sistema.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    min_versao: {
      type: 'string',
      size: 20
    },

    min_versao_cache: {
      type: 'string',
      size: 20
    }
  }
};

