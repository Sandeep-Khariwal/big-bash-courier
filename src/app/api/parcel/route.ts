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
    isCustomBooking,
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
    parcel.country = country;
    parcel.address = address;
    parcel.weight = Number(weight);
    if (userId) {
      parcel.userId = userId;
    }
    if (company) {
      parcel.company = company;
    }
    if (price) {
      parcel.price = Number(price);
    }
    if (isCustomBooking) {
      parcel.isCustomBooking = isCustomBooking;
    }

    const savedParcel = await parcel.save();
    return Response.json({
      status: 200,
      message: "Parcel details submitted",
      parcel: savedParcel,
    });
  } catch (e) {
    return Response.json({ status: 404, error: e });
  }
}

