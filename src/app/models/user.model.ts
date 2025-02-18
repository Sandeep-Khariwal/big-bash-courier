import { model, models, Schema } from "mongoose";

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  password: string;
  parcel:string[];
  discount:number
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
  parcel: {
    type: [String],
    ref:"parcel",
    default: [],
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const UserModel = models.user || model<UserModel>("user", userSchema);

export default UserModel;
