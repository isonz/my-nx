const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
module.exports = {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "admin888",
    "database": "my_nx",
    "entities": [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
    "synchronize": false,
    "logging": [
        "query",
        "error"
    ]
};


