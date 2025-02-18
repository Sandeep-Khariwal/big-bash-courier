import User from "@/app/models/user.model";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { generateAccessToken, validateToken } from "../helperFunctions";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(req: Request) {
  const { email, password, name, discount } = await req.json();
  try {
    dbConnect();
    const user = new User();
    user._id = `USER-${randomUUID()}`;
    user.name = name;
    user.email = email;
    user.discount = discount;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;

     await user.save();
    return Response.json({ status: 200 });
  } catch (e) {
    return Response.json({ status: 404, error: e });
  }
}
export async function PUT(req: Request) {
  try {

    dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email: email });
    if (!user) {
      return Response.json({ status: 404, message: "User not registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({
        status: 500,
        message: "Invalid email or password",
      });
    }

    const token = generateAccessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      discount: user.discount
    });

    return Response.json({ user: user, status: 200, token: token });
  } catch (e) {
    console.log(e);
    return Response.json({ status: 404, error: e });
  }
}

// validateToken
export async function GET(req: Request) {
  try {
    const decodedToken = validateToken(req);

    return Response.json({ status: 200, data: decodedToken });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}

// get user parcells
export async function PATCH(req: Request) {
  try {
    // connect db
    dbConnect();
    const allUsers = await User.find({})
    return Response.json({ status: 200, users:allUsers });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
