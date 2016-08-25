/**
 * Created by dcreey on 8/23/2016.
 */

module.exports = {
    debug: true,
    logging: {
        format: 'common'
    },
    hostname: 'http://localhost',
    app: {
        name: 'cwv'
    },
    connections: {
        web: {
            name: 'web-ui',
            testpath: './server/**/*.spec.js',
            port: 81
        },
        api: {
            name: 'api',
            testpath: './server/**/**/*.spec.js',
            port: 9001
        }
    }
}