import jwt, { Secret } from "jsonwebtoken";

export const generateAccessToken = (data: {
    _id:string,
    email:string,
    name:string
}): string => {
    const payload = {
      _id: data._id,
      email: data.email,
      name: data.name,
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET as Secret, {
      expiresIn: "365d",
    });
  };

  
  