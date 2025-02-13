import { model, Schema } from "mongoose";

export interface AdminModel {
  _id: string;
  name: string;
  email: string;
  password: string;
  users:string[];
}

const adminSchema = new Schema<AdminModel>({
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

export default model<AdminModel>("admin", adminSchema);
