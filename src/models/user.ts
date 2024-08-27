import { compare, genSalt, hash } from "bcrypt";
import { Schema, model, Model, Document } from "mongoose";

export interface UserI {
  email: string;
  password: string;
}

export interface UserDoc extends Document {
  email: string;
  password: string;
  compare(password: string): Promise<boolean>;
}

export interface UserM extends Model<UserDoc> {
  build: (attr: UserI) => UserDoc;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        (ret.id = ret._id), delete ret.password, delete ret.__v;
        delete ret._id;
      },
    },
    timestamps: true,
  },
);
userSchema.statics.build = function (attr: UserI) {
  return new User(attr);
};
userSchema.methods.compare = async function (
  password: string,
): Promise<boolean> {
  return await compare(password, this.password);
};

userSchema.pre<UserDoc>("save", async function () {
  if (!this.isModified || this.isNew) {
    const salt = await genSalt();
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
  }
});
const User = model<UserDoc, UserM>("User", userSchema);

export default User;
