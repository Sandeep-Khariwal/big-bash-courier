import{ model, models, Schema } from "mongoose";

interface CountryInterface {
    name:string
}

const countrySchema = new Schema<CountryInterface>({
  name: { type: String, required: true },
});

// export default model<CountryInterface>('country', countrySchema);
const CountryModel = models.country || model<CountryInterface>("country", countrySchema);

export default CountryModel;
