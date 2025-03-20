"use client";

import CreateBill from "@/admin/bookings/CreateBill";
import FindBills from "@/admin/bookings/FindBills";
import {
  Stack,
} from "@mantine/core";
import React, { useState } from "react";


const HomeSection = () => {

  const [isBillComponent,setIsBillComponent] = useState<boolean>(true)

  return (
    <Stack w={"90%"} h={"85vh"} mx={"auto"}>
      {
        isBillComponent ?
        <CreateBill
      setIsBillComponent={setIsBillComponent}
      />
      :
      <>
      <FindBills  setIsBillComponent={setIsBillComponent}/>
      </>
      }
    </Stack>
  );
};

export default HomeSection;
