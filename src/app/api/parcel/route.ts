import dbConnect from "@/app/lib/dbConnect";
import Parcel from "@/app/models/parcel.model";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const {
    senderEmail,
    reciverEmail,
    senderName,
    recieverName,
    senderContact,
    recieverContact,
    company,
    country,
    address,
    weight,
    price,
    userId,
  } = await req.json();
  try {
    dbConnect();
    const parcel = new Parcel();
    parcel._id = `PRCL-${randomUUID()}`;
    parcel.senderName = senderName;
    parcel.recieverName = recieverName;
    parcel.senderEmail = senderEmail;
    parcel.senderEmail = senderEmail;
    parcel.reciverEmail = reciverEmail;
    parcel.senderContact = senderContact;
    parcel.recieverContact = recieverContact;
    parcel.company = company;
    parcel.country = country;
    parcel.address = address;
    parcel.weight = Number(weight);
    parcel.price = Number(price);
    if (userId) {
      parcel.userId = userId;
    }

    const savedParcel = await parcel.save();
    return Response.json({ status: 200, message: "Parcel details submitted" , parcel:savedParcel });
  } catch (e) {
    return Response.json({ status: 404, error: e });
  }
}

export async function GET() {
  try {
    dbConnect();

    const allParcels = await Parcel.find({}).sort({ createdAt: 1 });
    return Response.json({ status: 200, allParcels });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
