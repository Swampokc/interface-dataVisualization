const Sequelize = require("sequelize");
const sequelize = new Sequelize('australia', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Соединение установлено.');
    })
    .catch(err => {
        console.error('Ошибка соединения:', err);
    });

var Region = sequelize.define('region', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

var Year = sequelize.define('year', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

var Population = sequelize.define('population', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    regionFK: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    yearFK: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Region.hasMany(Population,{foreignKey:'regionFK', sourceKey:'id'});
Population.belongsTo(Region,{foreignKey:'regionFK', targetKey:'id'});

Year.hasMany(Population,{foreignKey:'yearFK', sourceKey:'id'});
Population.belongsTo(Year,{foreignKey:'yearFK', targetKey:'id'});

sequelize.sync();

module.exports.Region = Region;
module.exports.Year = Year;
module.exports.Population = Population;

module.exports.sequelize = sequelize;