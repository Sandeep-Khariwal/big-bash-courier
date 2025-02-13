import User from "@/app/models/user.model";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../helperFunctions";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  try {
    const user = new User();
    user._id = `USER-${randomUUID()}`;
    user.name = name;
    user.email = email;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;

    const savedUser = await user.save();
    return Response.json({ status: 200, user: savedUser });
  } catch (e: any) {
    return Response.json({ status: 404, error: e });
  }
}
export async function GET(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email });

    if (!user) {
      return { status: 404, message: "User not registered" };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 500, message: "Invalid email or password" };
    }

    const token = generateAccessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    return Response.json({ user: user, status: 200, token: token });
  } catch (e) {
    console.log(e);
    return Response.json({ status: 404, error: e });
  }
}
