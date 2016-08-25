/**
 * Created by dcreey on 8/23/2016.
 */

module.exports = function (request, reply) {

    var context = {
        pageTitle: 'My App'
    };

    reply.file((request) => {
        return request.params.filename;
    })

};