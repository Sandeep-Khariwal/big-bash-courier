import { model, models, Schema } from "mongoose";

interface RateInterface {
  company: string;
  country: string;
  rates: { weight: Number; price: Number }[];
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
