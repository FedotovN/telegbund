import { Sequelize } from 'sequelize';
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_PORT, DATABASE_HOST } from "../environment.js";

export const db = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        dialect: 'postgres',
    }
)

export async function connectToDatabase() {
    try {
        console.log('Connecting to PostgreSQL 🐘')
        await db.authenticate();
        await db.sync()
        console.log('Connected to Database 🎉');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}