import jwt, { Secret } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const generateAccessToken = (data: {
  _id: string;
  email: string;
  name: string;
  discount?:number
}): string => {
  const payload = {
    _id: data._id,
    email: data.email,
    name: data.name,
    discount: data.discount,
  };
  return jwt.sign(
    payload,
    process.env.TOKEN_SECRET || ("bigbashcourierservice" as Secret),
    {
      expiresIn: "365d",
    }
  );
};

export function validateToken(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "bigbashcourierservice"
    );
    return decoded;
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token",error:err },
      { status: 401 }
    );
  }
}
