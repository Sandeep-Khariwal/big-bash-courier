import{ model, models, Schema } from "mongoose";

interface CompanyInterface {
    name:string
}

const companySchema = new Schema<CompanyInterface>({
  name: { type: String, required: true },
});

// export default model<CompanyInterface>('company', companySchema);
const CompanyModel = models.company || model<CompanyInterface>("company", companySchema);

export default CompanyModel;

