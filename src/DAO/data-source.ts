import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import dotenv from 'dotenv';
import { UserRelation } from '../entity/UserRelation';
import { HashTag } from '../entity/HashTag';
import { HashTagRelation } from '../entity/HashTagRelation';
dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: 'friending_db',
  synchronize: true,
  logging: false,
  entities: [User, UserRelation, HashTag, HashTagRelation],
  migrations: [],
  subscribers: [],
});
