import  { Schema, model } from "mongoose";
import { models } from "mongoose";

// Define the interface
export interface BillData {
  _id: string;
  trackingNumber: string;
  senderName: string;
  senderMobile: string;
  senderAddress: string;
  receiverName: string;
  receiverMobile: string;
  receiverAddress: string;
  destination: string;
  shipmentType: "air" | "road";
  goodsDesc: string;
  pieces: string;
  actualWgt: string;
  chargedWgt: string;
  goodsValue: string;
  toPatCod: string;
  grossAmount: string;
  podChrg: string;
  odaChrg: string;
  insurancePercent: string;
  netAmount: string;
  date: string;
}

// Define the Mongoose schema
const billSchema: Schema = new Schema<BillData>(
  {
    _id: { type: String, required: true, unique: true },
    trackingNumber: { type: String, required: false },
    senderName: { type: String, required: false },
    senderMobile: { type: String, required: false },
    senderAddress: { type: String, required: false },
    receiverName: { type: String, required: false },
    receiverMobile: { type: String, required: false },
    receiverAddress: { type: String, required: false },
    destination: { type: String, required: false },
    shipmentType: { type: String, required: false, enum: ["air", "road"] },
    goodsDesc: { type: String, required: false },
    pieces: { type: String, required: false },
    actualWgt: { type: String, required: false },
    chargedWgt: { type: String, required: false },
    goodsValue: { type: String, required: false },
    toPatCod: { type: String, required: false },
    grossAmount: { type: String, required: false },
    podChrg: { type: String, required: false },
    odaChrg: { type: String, required: false },
    insurancePercent: { type: String, required: false },
    netAmount: { type: String, required: false },
    date: { type: String, default: "", required: false },
  },
  { timestamps: true }
);

const Bill = models.bill || model<BillData>("bill", billSchema);
export default Bill;
