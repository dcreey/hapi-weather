/**
 * Created by dcreey on 8/23/2016.
 */

module.exports = {
    debug: true,
    logging: {
        format: 'tiny'
    },
    hostname: 'http://localhost',
    app: {
        name: 'cwv'
    },
    connections: {
        web: {
            name: 'web-ui',
            port: 80
        },
        api: {
            name: 'api',
            port: 9000
        }
    }
}