import { model, models, Schema } from "mongoose";

export interface ContactModal {
  _id: string;
  name: string;
  number:string
}

const contactSchema = new Schema<ContactModal>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    default: "",
  },
});

const Contact = models.contact || model<ContactModal>("contact", contactSchema);

export default Contact;
