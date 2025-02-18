import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import Admin from "@/app/models/admin.model";
import { randomUUID } from "crypto";
import { generateAccessToken } from "../helperFunctions";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  try {
    // connect db
    dbConnect();
    const admin = new Admin();
    admin._id = `ADMN-${randomUUID()}`;
    admin.name = name;
    admin.email = email;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    admin.password = hashedPassword;

    const savedAdmin = await admin.save();
    return Response.json({ status: 200 , admin:savedAdmin });
  } catch (e) {
    return Response.json({ status: 404, error: e });
  }
}
export async function PUT(req: Request) {
  try {
        dbConnect()
    const { email, password } = await req.json();
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return Response.json({ status: 404, message: "User not registered" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return Response.json({
        status: 500,
        message: "Invalid email or password",
      });
    }

    const token = generateAccessToken({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });

    return Response.json({ admin: admin, status: 200, token: token });
  } catch (e) {
    console.log(e);
    return Response.json({ status: 404, error: e });
  }
}
