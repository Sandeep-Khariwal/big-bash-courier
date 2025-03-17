import dbConnect from "../../../../app/lib/dbConnect";
import Parcel from "../../../../app/models/parcel.model";

export async function GET(
  _: Request,
  params: { params: Promise<{ isCustomBooking: string }> }
) {
  const { isCustomBooking } = await params.params;
  try {
    dbConnect();

    let isTrue = false;

    if (isCustomBooking === "true") {
      isTrue = true;
    }
    const allParcels = await Parcel.find({ isCustomBooking: isTrue });

    return Response.json({ status: 200, allParcels });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
