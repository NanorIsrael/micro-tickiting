import { Schema, model, Model, Document } from "mongoose";

export interface UserI {
	email: string
	password: string
}

export interface UserDoc extends Document {
	email: string
	password: string
}

export interface UserM extends Model<UserDoc> {
	build: (attr: UserI) => UserDoc;
}

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	}
},{
	timestamps: true
})
userSchema.statics.build = (attr: UserI) => new User(attr);
const User = model<UserI, UserM>('User', userSchema);

export default User