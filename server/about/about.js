/**
 * Created by dcreey on 8/23/2016.
 */

module.exports = function (request, reply) {

    var context = {
        pageTitle: 'About Us'
    };

    reply.view('about', context);

};