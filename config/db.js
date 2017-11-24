const Sequelize = require('sequelize');
module.exports = new Sequelize('d4sqn9dnjgu5fe', 'ffvuzjotzyakua', '0f30457546a7ce6927cfb34bd59182f383e947ff81aa5d6661e4ac34664801b7', {
    host: 'ec2-174-129-15-251.compute-1.amazonaws.com',
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432,
    logging: false,
    dialectOptions: {
        ssl: true
    }
});

// const Sequelize = require('sequelize');
// module.exports = new Sequelize('contatinhos', 'postgres', 'admin', {
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

// let match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
// module.exports = new Sequelize(match[5], match[1], match[2], {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     port: match[4],
//     host: match[3],
//     logging: false,
//     dialectOptions: {
//         ssl: true
//     }
// });//