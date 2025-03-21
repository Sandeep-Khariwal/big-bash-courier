import dbConnect from "@/app/lib/dbConnect";
import Bill from "@/app/models/bill.model";
import { randomUUID } from "crypto";

interface Filter {
  senderName?: string;
  destination?: string;
  date?: { $gte: string; $lte: string };
}

export async function POST(req: Request) {
  const {
    trackingNumber,
    senderName,
    senderMobile,
    senderAddress,
    receiverName,
    receiverMobile,
    receiverAddress,
    destination,
    shipmentType,
    goodsDesc,
    pieces,
    actualWgt,
    chargedWgt,
    goodsValue,
    toPatCod,
    grossAmount,
    podChrg,
    odaChrg,
    insurancePercent,
    netAmount,
    date,
  } = await req.json();
  try {
    const stringDate = date.toString();
    // connect db
    dbConnect();
    const bill = new Bill();
    bill._id = `BILL-${randomUUID()}`;
    bill.trackingNumber = trackingNumber;
    bill.senderName = senderName;
    bill.senderMobile = senderMobile;
    bill.senderAddress = senderAddress;
    bill.receiverName = receiverName;
    bill.receiverMobile = receiverMobile;
    bill.receiverAddress = receiverAddress;
    bill.destination = destination;
    bill.shipmentType = shipmentType;
    bill.goodsDesc = goodsDesc;
    bill.pieces = pieces;
    bill.actualWgt = actualWgt;
    bill.chargedWgt = chargedWgt;
    bill.goodsValue = goodsValue;
    bill.toPatCod = toPatCod;
    bill.grossAmount = grossAmount;
    bill.podChrg = podChrg;
    bill.odaChrg = odaChrg;
    bill.insurancePercent = insurancePercent;
    bill.netAmount = netAmount;
    bill.date = stringDate.split("T")[0];

    await bill.save();

    return Response.json({ status: 200, msg: "Bill created" });
  } catch (e) {
    console.log(e);

    return Response.json({ status: 404, error: e });
  }
}

export async function PUT(req: Request) {
  try {
    dbConnect();
  
    // Parse request data
    const data = await req.json();  // Assuming you're using `req.json()` for JSON parsing
  
    // Extract the necessary fields from request data
    const { senderName, destination, fromDate, toDate } = data;
  
    // Initialize the filter object with the correct type
    const filter: Filter = {};
  
    // Add filter conditions based on provided parameters
    if (senderName) filter.senderName = senderName;
    if (destination) filter.destination = destination;
  
    // Date filtering logic
    if (fromDate && toDate) {
      // Convert fromDate and toDate to Date objects
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
  
      // Add the date range condition to the filter
      filter.date = {
        $gte: startDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        $lte: endDate.toISOString().split('T')[0],   // Convert to YYYY-MM-DD format
      };
    }
  
    // Find bills based on the filter
    const allBills = await Bill.find(filter);
  
    if (allBills.length === 0) {
      return Response.json({ status: 404, message: 'Bill not found' });
    }
  
    return Response.json({ status: 200, allBills });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500, message: 'Server error' });
  }
  
}
