import { model, Schema } from "mongoose";

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  password: string;
  users:string[];
}

const userSchema = new Schema<UserModel>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
});

export default model<UserModel>("user", userSchema);
