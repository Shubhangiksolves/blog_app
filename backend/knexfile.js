module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://postgres:postgres@localhost:5432/my_blogs',
        migrations: {
            directory:__dirname + '/db/migrations/',
        },
        seeds: {
            directory:__dirname + '/db/seeds/',
        }, 
    },
    production: {
        client: 'pg',
        connection: 'postgres://postgres:postgres@localhost:5432/my_blogs',
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    }
}