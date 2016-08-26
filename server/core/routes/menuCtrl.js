/**
 * Created by dcreey on 8/23/2016.
 */

var Path = require('Path');
var menu = require(Path.join(global.appRoot, 'config', 'customModules'));

module.exports = function () {
    return {
        getMenus(request, reply) {
            var menuItems = [];

            menu.forEach((x) => {
                var path = x.plugin.split("/");
                menuItems.push(path[path.length - 1]);
            })

            if (!menuItems.length) reply({ error : "No temperature values found" }).code(404);
            else reply(menuItems);
        }
    };
}