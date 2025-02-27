import dbConnect from "@/app/lib/dbConnect";
import Company from "@/app/models/company.model";
import Rate from "@/app/models/rate.model";

//create a rate
export async function POST(req: Request) {
  try {
    dbConnect();
    // Parse the incoming request data
    const { companyId, country, weightPrice } = await req.json();

    console.log("companyId : ", companyId);

    // Check if the company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return Response.json({
        status: 404,
        message: "Company not found",
      });
    }

    // Check if rates for the given country already exist
    const existingRate = await Rate.findOne({ company: companyId, country });

    // If rates exist for the country, update them
    if (existingRate) {
      // Update rates (push new weights/prices)
      for (const { weight, price } of weightPrice) {
        // Check if the weight already exists in the rates for this country
        const existingWeight = existingRate.rates.find(
          (r: { weight: number; price: number }) => r.weight === weight
        );
        if (existingWeight) {
          // Update price for existing weight
          existingWeight.price = price;
        } else {
          // Add new weight-price pair
          existingRate.rates.push({ weight, price });
        }
      }

      // Save the updated rate document
      await existingRate.save();
      return Response.json({
        status: 200,
        message: "Rates updated successfully",
        updatedRates: existingRate,
      });
    }

    // If rates don't exist for the country, create a new rate document
    const newRate = new Rate({
      company: companyId,
      country,
      rates: weightPrice,
    });

    // Save the new rate document
    await newRate.save();

    return Response.json({
      status: 200,
      message: "Rates created successfully",
      createdRate: newRate,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

//for getting data
export async function PUT(req: Request) {
  try {
    // connect db
    dbConnect();
    const { country, weight } = await req.json();

    // Fetch rates for the given country
    const rates = await Rate.find({ country }).populate({
      path: "company",
      select: ["name"],
    });

    if (!rates) {
      return Response.json({
        status: 404,
        message: "Rates not found for this country",
      });
    }

    const resultRates = rates
      .map((rate) => {
        // Iterate over each rate and check for matching weight
        for (const rat of rate.rates) {
          let price = rat.price;
          if(weight>31 && rat.weight === 31){
            return {
              company: rate.company,
              price: price,
              weight: rat.weight,
              country: rate.country,
            };
          }

          if (rat.weight === weight) {

            return {
              company: rate.company,
              price: price,
              weight: rat.weight,
              country: rate.country,
            };
          }
        }
        return null;
      })
      .filter((item) => item !== null); 

    console.log(resultRates);

    return Response.json({ status: 200, rates: resultRates }); // rates: resultRates
  } catch (error) {
    // You can log or return the error here for better debugging
    console.error(error);
    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const { companyId, country } = await req.json();
    const rate = await Rate.findOne({ company: companyId, country: country });
    console.log("Company ID:", companyId, country);
    return Response.json({
      status: 200,
      rate: rate,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
}
