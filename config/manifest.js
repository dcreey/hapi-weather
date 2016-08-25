/**
 * Created by dcreey on 8/23/2016.
 */

// array of custom plugins
var customPlugins = require('./customModules');

module.exports = function(config, goodOptions) {
    var connections = [];
    var plugins = [];

    // Core plugins - required
    plugins = [
        //logging
        {
            plugin: {
                register: "good",
                options: goodOptions
            }
        },
        {
            plugin: "inert"
        },
        {
            plugin: "vision"
        },
        // serves static content from public path
        {
            plugin: {
                register: "visionary",
                options: {
                    engines: { "html": "handlebars" },
                    path: "./public/"
                }
            }
        },
        {
            plugin: './server/core'
        }
    ];

    // add custom modules defined in customModules.js - not required
    customPlugins.forEach((plugin) => {
        plugins.push(plugin);
    });

    // Get connection information for environment (web and api)
    for (var p in config.connections) {
        connections.push(
            {
                port: config.connections[p].port,
                labels: [config.connections[p].name],
                routes: {
                    cors: true
                }
            }
        )
    }

    const manifest = {
        server: {
            app: {
                slogan: 'Visualizing Chicago Temperatures'
            }
        },
        connections: connections,
        registrations: plugins
    };

    return manifest;
}