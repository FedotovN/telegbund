import { Admin } from "../models/admin.model.js";
import { Client } from "../models/client.model.js";
import { Model } from "sequelize";

export async function saveClientUser(userId: number, chatId: number): Promise<Model> {
    const candidate = await Client.findOne({ where: { userId } });
    if (candidate) return candidate.update({ userId, chatId });
    return Client.create({ userId, chatId });
}
export async function saveAdminUser(userId: number, chatId: number): Promise<Model> {
    const candidate = await Admin.findOne({ where: { userId } });
    if (candidate) return candidate.update({ userId, chatId });
    return Admin.create({ userId, chatId });
}

export async function getClientUser(userId: number) {
    return Client.findOne({ where: { userId } });
}
export async function getAdminUser(userId: number) {
    return Admin.findOne({ where: { userId } });
}