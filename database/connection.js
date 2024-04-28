const { Sequelize } = require("sequelize");

const connection = new Sequelize(
    "artigle",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        timezone: "-03:00"
    }
);

module.exports = connection;
