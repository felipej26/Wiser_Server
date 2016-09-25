/**
 * FacebookController.js
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getAccessToken: function(req, res) {
        Facebook.findOne({
            id: 1
        }).exec(function (err, accessToken){
            if (err) { return res.serverError(err); }

            if (!accessToken) {
                return res.notFound('Could not find accessToken!.');
            }
            
            return res.json(accessToken);
        });
    }
};

