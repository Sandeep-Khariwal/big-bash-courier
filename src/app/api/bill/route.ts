import dbConnect from "@/app/lib/dbConnect";
import Bill from "@/app/models/bill.model";
import { randomUUID } from "crypto";

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
    const data = await req.json();
    const newDate = data?.date?.toString();
    const filter = {} as { [key: string]: string };

    if (data.senderName) filter.senderName = data.senderName;
    if (data.destination) filter.destination = data.destination;

    if (newDate) {
      filter.date = newDate.split("T")[0];
    }

    const allBills = await Bill.find(filter);

    if (allBills.length === 0) {
      return Response.json({ status: 404, message: "Bill not found" });
    }

    return Response.json({ status: 200, allBills });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 404, message: "server error" });
  }
}
