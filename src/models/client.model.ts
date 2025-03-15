import { db } from '../database/config.js';
import { DataTypes } from "sequelize";

export const Client = db.define('client', {
    id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.BIGINT, unique: true },
    chatId: { type: DataTypes.BIGINT, unique: true },
});