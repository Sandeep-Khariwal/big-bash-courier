import dbConnect from "@/app/lib/dbConnect";
import Country from "@/app/models/country.model";

export async function POST(req: Request) {
  try {
    dbConnect();
    const { name } = await req.json();
    const newCountry = new Country({
      name: name,
    });
    const saved = await newCountry.save();
    return Response.json({ status: 200, country: saved });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
export async function GET(req: Request) {
  try {
    dbConnect();
    const countries = await Country.find({});
    return Response.json({ status: 200, countries: countries });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
