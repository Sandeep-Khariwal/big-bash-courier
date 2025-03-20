import dbConnect from "@/app/lib/dbConnect";
import Contact from "@/app/models/contact.model";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    dbConnect();
    const { name , number } = await req.json();
    const contact = new Contact();
    contact._id = `CNCT-${randomUUID()}`;
    contact.name = name
    contact.number = number

    const saved = await contact.save();
    return Response.json({ status: 200, contact: saved });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}

export async function GET() {
  try {
    dbConnect();
    const contacts = await Contact.find({});
    return Response.json({ status: 200, contacts });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}