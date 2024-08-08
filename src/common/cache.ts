import mongoose from "mongoose";
import { promisify } from "util";
const exec = mongoose.Query.prototype.exec;
// const arguments = []

mongoose.Query.prototype.exec = function (...args: any[]) {
  try {
    const key = Object.assign({}, this.getQuery(), {
      collection: this.model.collection.name,
    });
    return exec.apply(this, args as any);
  } catch (error) {
    console.error("Error in exec hook:", error);
    throw error;
  }
};

export const cachedMongoose = mongoose;
