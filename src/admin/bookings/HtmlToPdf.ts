import { BillData } from "@/app/Home-components/HomeSection";

export const createBill = (data: BillData) => {
  return `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
    @media print {
  * {
    -webkit-print-color-adjust: exact !important; /* For Chrome/Safari */
    print-color-adjust: exact !important; /* For other browsers */
  }
}

    </style>
  </head>

  <body>
    <div style="width: 900px; height:550px;  border: 1px solid #ec4899">
      <div style="width: 100%; height: 25%; display: flex">
        <div style="width: 34%; border: 1px solid #ec4899; display: flex">
          <img src="/logo.jpg" width="50%" alt="no" />
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 5px;
            "
          >
            <p
              style="
                font-weight: 700;
                font-size: 26px;
                color: #ec4899;
                margin: 0;
              "
            >
              Big
            </p>
            <p
              style="
                font-weight: 700;
                font-size: 26px;
                color: #ec4899;
                margin: 0;
              "
            >
              Bash
            </p>
            <p
              style="
                font-weight: 700;
                font-size: 26px;
                color: #ec4899;
                margin: 0;
              "
            >
              Courier
            </p>
          </div>
        </div>
        <div
          style="
            width: 33%;
            border: 1px solid #ec4899;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            padding-left: 10px;
          "
        >
          <p
            style="
              font-weight: 600;
              font-size: 20px;
              color: #ec4899;
              margin-bottom: 10px;
            "
          >
            Big Bash Courier service
          </p>
          <p
            style="
              font-weight: 600;
              font-size: 16px;
              color: rgb(62, 61, 61);
              margin: 0px;
            "
          >
            MC market, sirsa, haryana
          </p>
          <p
            style="
              font-weight: 600;
              font-size: 16px;
              color: rgb(62, 61, 61);
              margin: 2px;
            "
          >
            125055
          </p>
        </div>
        <div
          style="
            width: 33%;
            border: 1px solid #ec4899;
               border-bottom: 0px;
            display: flex;
            flex-direction: column;
          "
        >
          <div
            style="
              height: 25%;
              width: 100%;
              background-color: #ec4899;
              display: flex;
            "
          >
            <p style="margin: auto; font-size: 18px; font-weight: 500">
              Tracking No.
            </p>
          </div>
          <div style="height: 75%; width: 100%; display: flex">
            <p
              style="
                margin: auto;
                font-weight: 700;
                font-size: 30px;
                color: rgb(62, 61, 61);
              "
            >
              ${data.trackingNumber}
            </p>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 60%; display: flex">
        <div style="width: 67%; height: 100%; border: 1px solid #ec4899">
          <div
            style="
              height: 10%;
             border: none;
            //   border-right: 1px solid #ec4899;
              
              display: flex;
              justify-content: space-around;
              align-items: center;
              padding: 2px;
            "
          >
            <p style="color: rgb(21, 121, 121)">
              https://www.bigbashcourierservice.in
            </p>
            <p style="color: rgb(21, 121, 121)">Big Bash courier service</p>
          </div>
          <div style="height: 45%; border: 1px solid #ec4899; display: flex">
            <div
              style=
              "
                width: 10%;
                border: 1px solid #ec4899;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #ec4899;
              "
            >
              <span>S</span>
              <span>E</span>
              <span>N</span>
              <span>D</span>
              <span>E</span>
              <span>R</span>
            </div>
            <div
              style="
                width: 50%;
                border: 1px solid #ec4899;
                   border-top: 0px;
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <p
                style="
                  font-weight: 700;
                  font-size: 16px;
                  color: rgb(62, 61, 61);
                  margin: 2px;
                "
              >
                ${data.senderName}
              </p>
              <p
                style="
                  font-weight: 700;
                  font-size: 16px;
                  color: rgb(62, 61, 61);
                  margin: 2px;
                "
              >
                 ${data.senderMobile}
              </p>
              <p
                style="
                  font-weight: 700;
                  font-size: 16px;
                  color: rgb(62, 61, 61);
                  margin: 2px;
                "
              >
                 ${data.senderAddress}
              </p>
            </div>
            <div
              style="
                width: 40%;
                border: 0px solid #ec4899;
                border-right: 0px;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                style="height: 15%; background-color: #ec4899; display: flex"
              >
                <p style="margin: auto; font-size: 18px; font-weight: 500">
                  Origin
                </p>
              </div>
              <p
                style="
                  margin: auto;
                  font-weight: 700;
                  font-size: 30px;
                  color: rgb(62, 61, 61);
                "
              >
                 Big bash sirsa
              </p>
            </div>
          </div>
          <div style="height: 43.5%; border: 1px solid #ec4899; display: flex">
            <div
              style="
                width: 10%;
                border: 1px solid #ec4899;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #ec4899;
              "
            >
              <span>R</span>
              <span>E</span>
              <span>C</span>
              <span>E</span>
              <span>I</span>
              <span>V</span>
              <span>E</span>
              <span>R</span>
            </div>
            <div
              style="
                width: 50%;
                border: 1px solid #ec4899;
                  border-top: 0px;
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <p
                style="
                  font-weight: 600;
                  font-size: 16px;
                  color: rgb(62, 61, 61);
                  margin: 2px;
                "
              >
                 ${data.receiverName}
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 16px;
                  color: rgb(62, 61, 61);
                  margin: 2px;
                "
              >
                 ${data.receiverMobile}
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 16px;
                  color: rgb(62, 61, 61);
                  margin: 2px;
                "
              >
                 ${data.receiverAddress}
              </p>
            </div>
            <div style="width: 40%; border: 0px solid #ec4899; border-right: 0px;">
              <div
                style="height: 15%; background-color: #ec4899; display: flex"
              >
                <p style="margin: auto; font-size: 18px; font-weight: 500">
                  Destination
                </p>
              </div>
              <div style="height: 85%; display: flex">
                <p
                  style="
                    margin: auto;
                    font-weight: 700;
                    font-size: 30px;
                    color: rgb(62, 61, 61);
                  "
                >
                   ${data.destination}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 33%; height: 100%; border: 1px solid #ec4899"></div>
      </div>
      <div style="width: 100%; height: 15%; display: flex">
        <div
          style="
            width: 10%;
            border: 1px solid #ec4899;
            display: flex;
            flex-direction: column;
          "
        >
          <div style="height: 25%; background-color: #ec4899; display: flex">
            <p style="margin: auto; font-size: 17px; font-weight: 500">Qty</p>
          </div>
          <p style="margin: auto; font-size: 17px; font-weight: 500"> ${
            data.pieces
          }</p>
        </div>
        <div
          style="
            width: 30%;
            border: 1px solid #ec4899;
            display: flex;
            flex-direction: column;
          "
        >
          <div style="height: 25%; background-color: #ec4899; display: flex">
            <p style="margin: auto; font-size: 17px; font-weight: 500">
              Weight
            </p>
          </div>
          <p
            style="
              margin: auto;
              font-size: 17px;
              font-weight: 500;
              margin: auto;
            "
          >
             ${data.actualWgt}
          </p>
        </div>
        <div
          style="
            width: 30%;
            border: 1px solid #ec4899;
            display: flex;
            flex-direction: column;
          "
        >
          <div style="height: 25%; background-color: #ec4899; display: flex">
            <p style="margin: auto; font-size: 17px; font-weight: 500">
              Charges
            </p>
          </div>
          <p style="margin: auto; font-size: 17px; font-weight: 500"> ${
            data.netAmount
          }</p>
        </div>
        <div
          style="
            width: 30%;
            border: 1px solid #ec4899;
            display: flex;
            flex-direction: column;
          "
        >
          <div style="height: 25%; background-color: #ec4899; display: flex">
            <p style="margin: auto; font-size: 17px; font-weight: 500"> ${formatDate(
              data.dateOfBirth || new Date()
            )}</p>
          </div>
          <p style="margin: auto; font-size: 17px; font-weight: 500">
            24/03/2025
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
        `;
};

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
