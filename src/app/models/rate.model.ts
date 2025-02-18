import { model, models, Schema } from "mongoose";

export interface RateInterface {
  company: string;
  country: string;
  rates: { weight: number; price: number }[];
}

const rateSchema = new Schema<RateInterface>({
  company: { type: String, ref: "company", required: true },
  country: { type: String, required: true },
  rates: [
    {
      weight: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

// export default model<RateInterface>("rate", rateSchema);
const RateModel = models.rate || model<RateInterface>("rate", rateSchema);

export default RateModel;
