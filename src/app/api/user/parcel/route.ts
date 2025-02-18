import dbConnect from "@/app/lib/dbConnect";
import Parcel from "@/app/models/parcel.model";
import User from "@/app/models/user.model";

// update parcel id in user
export async function PUT(req: Request) {
  try {
    dbConnect();
    const { userId, parcelId } = await req.json();
    if (!userId || !parcelId) {
      return Response.json({
        status: 400,
        error: "Missing userId or parcelId",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ status: 404, error: "User not found" });
    }

    // Update user and push parcelId into the parcel array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { parcel: parcelId } }, // Prevents duplicate entries
      { new: true }
    );
    return Response.json({ status: 200, updatedUser });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
export async function PATCH(req: Request) {
  try {
    // connect db
    dbConnect();
    const { parcelIds } = await req.json();
    const allParcels = await Parcel.find({ _id: { $in: parcelIds } });
    return Response.json({ status: 200, allParcels });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
export async function GET(_: Request,
  context: { params: { userId: string } } 
) {
  try {
    const { userId } = context.params;
    const allParcels = await Parcel.find({ userId: userId });
    return Response.json({ status: 200, allParcels });
  } catch (error) {
    return Response.json({ status: 404, error });
  }
}
