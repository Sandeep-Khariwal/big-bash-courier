import dbConnect from "@/app/lib/dbConnect";
import Company from "@/app/models/company.model";

export async function POST(req: Request) {
  try {
    dbConnect();
    const { name } = await req.json();
    const newCompany = new Company({
      name: name,
    });
    const saved = await newCompany.save();
    return Response.json({ status: 200, company: saved });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}

export async function GET() {
  try {
    dbConnect();
    const companies = await Company.find({});
    return Response.json({ status: 200, companies });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
