import { model, models, Schema } from "mongoose";

export interface ParcelModel {
  _id: string;
  senderName: string;
  userId: string;
  recieverName: string;
  company: string;
  country: string;
  address: string;
  senderEmail: string;
  reciverEmail: string;
  senderContact: string;
  recieverContact: string;
  weight: number;
  price: number;
  done: boolean;
  dispatch: Date | null;
  delivered: Date | null;
}

const parcelSchema = new Schema<ParcelModel>({
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref:"user",
    required: false,
    default:""
  },
  senderName: {
    type: String,
    required: true,
  },
  recieverName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    default: "",
  },
  reciverEmail: {
    type: String,
    default: "",
  },
  senderContact: {
    type: String,
    default: "",
  },
  recieverContact: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  weight: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  done: {
    type: Boolean,
    default: false,
  },
  dispatch: {
    type: Date,
    default: null,
  },
  delivered: {
    type: Date,
    default: null,
  },
},{timestamps:true});

const ParcelModel = models.parcel || model<ParcelModel>("parcel", parcelSchema);

export default ParcelModel;
