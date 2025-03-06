import { db } from '../database/config.js';
import { DataTypes } from "sequelize";

export const Quote = db.define('quote', {
   id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
   text: { type: DataTypes.STRING },
   isUsed: { type: DataTypes.BOOLEAN },
});