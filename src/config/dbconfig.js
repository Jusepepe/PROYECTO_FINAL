import 'dotenv/config'
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'postgres',
    pool : {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    dialectOptions: {
        ssl: true,
    },
});
