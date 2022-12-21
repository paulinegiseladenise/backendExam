import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";
import mongoose, { Model } from "mongoose";
import { IUser } from "../AuthService/auth.interfaces";
import { IJournalEntry } from "../ContentService/content.interfaces";
import { JournalEntryModel } from "../Models/JournalEntryModel";
import { UserModel } from "../Models/UserModel";
import environment from "./environment";

export interface Models {
  UserModel: Model<IUser>;
  JournalEntryModel: Model<IJournalEntry>;
}

export interface Db {
  models: Models;
}

async function database(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  mongoose.set("strictQuery", true);
 
  mongoose.connection.on("connected", () => {
    server.log.info("MongoDB connected!");
  });

  mongoose.connection.on("disconnected", () => {
    server.log.info("Mongo DB disconnected!");
  });

  await mongoose.connect(environment.DB_URL);

  const models: Models = { UserModel, JournalEntryModel };

  server.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      request.db = { models };
    }
  );
}

export default fastifyPlugin(database);