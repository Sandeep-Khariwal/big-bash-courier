import dbConnect from "@/app/lib/dbConnect";
import Parcel from "@/app/models/parcel.model";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const {
    senderName,
    recieverName,
    senderContact,
    recieverContact,
    company,
    recieverAddress,
    senderAddress,
    recieverPinCode,
    senderPinCode,
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
    parcel.senderContact = senderContact;
    parcel.recieverContact = recieverContact;
    parcel.recieverAddress = recieverAddress;
    parcel.senderAddress = senderAddress;
    parcel.recieverPinCode = recieverPinCode;
    parcel.senderPinCode = senderPinCode;
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

