import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Users } from "../entities/Users.js";
import { Category } from "../entities/Category.js";
import { MenuItem } from "../entities/MenuItem.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    synchronize: true,
    logging: false,

    entities: [Users, Category, MenuItem],
    migrations: [],
    subscribers: [],
});
