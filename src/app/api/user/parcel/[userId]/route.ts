import Parcel from "@/app/models/parcel.model";


export async function GET(_: Request,
    params: { params: Promise<{ userId: string }> } 
  ) {
    try {
      const  {userId}  = await params.params;
      
      const allParcels = await Parcel.find({ userId: userId });
      return Response.json({ status: 200, allParcels });
    } catch (error) {
      return Response.json({ status: 404, error });
    }
  }