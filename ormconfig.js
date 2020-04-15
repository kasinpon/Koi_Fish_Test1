module.exports =  {
    "type": process.env.DB_TYPE || "mysql",
    "host": process.env.DB_HOST || 'us-cdbr-iron-east-01.cleardb.net',
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USERNAME || 'b4b5c493a33542',
    "password": process.env.DB_PASSWORD || '9bf31f25',
    "database": process.env.DB_DATABASE || 'koifishtest',
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};
