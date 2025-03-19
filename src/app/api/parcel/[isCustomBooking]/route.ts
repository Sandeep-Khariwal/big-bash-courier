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
    const allParcels = await Parcel.find({
      isCustomBooking: isTrue,
      done: false,
    });

    return Response.json({ status: 200, allParcels });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
export async function PUT(
  req: Request
) {
  try {
    const { id } = await req.json();
    console.log("id is ", id);
    
    dbConnect();

    const booking = await Parcel.findByIdAndUpdate(id, { done: true });
    if (!booking) {
      return Response.json({ status: 404, message: "booking not found" });
    }
    return Response.json({ status: 200, message: "booking marked done" });
  } catch (error) {
    return Response.json({
      status: 500,
      error,
    });
  }
}
