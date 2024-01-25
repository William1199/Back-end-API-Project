const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tma', 'root', '123456', {
    host: 'localhost', dialect: 'mysql'
})

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connections has been established successfully");
    } catch (error) {
        console.log("Unable to connect to database", error);
    }
}

export default connection;