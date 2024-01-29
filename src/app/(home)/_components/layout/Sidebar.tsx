"use client";

import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const { state } = useEmployeeContext();
  const searchParams = useSearchParams();
  const data = state[0];

  if (!searchParams.get("employee")) {
    return (
      <aside className="fixed right-0 top-0 hidden h-screen w-80 flex-col items-center justify-center overflow-y-auto border-l bg-white px-3 pt-20 lg:flex">
        <div>Nothing to show</div>
      </aside>
    );
  }

  return (
    <aside className="fixed right-0 top-0 hidden h-screen w-80 flex-col items-center justify-center overflow-y-auto border-l bg-white px-3 pt-20 lg:flex">
      {data.employee ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div>
            <Image
              src={data.employee.attributes.profilePic}
              alt="Employee"
              className="size-32 rounded-full"
              width={128}
              height={128}
            />
          </div>
          <div className="flex flex-col items-center">
            <h2>
              {data.employee.name.charAt(0).toUpperCase() +
                data.employee.name.slice(1)}
            </h2>
            <p>{data.employee.attributes.position}</p>
          </div>
          <p className="text-center">{data.employee.attributes.bio}</p>
          <div>
            <div className="flex justify-between gap-x-5">
              <h3>Total Direct Reports:</h3>
              <p>{data.totalDirectReports}</p>
            </div>
            <div className="flex justify-between gap-x-5">
              <h3>Total Indirect Reports:</h3>
              <p>{data.totalIndirectReports}</p>
            </div>
            <div className="flex justify-between gap-x-5">
              <h3>Total Reports:</h3>
              <p>{data.totalReports}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Employee not found</div>
      )}
    </aside>
  );
};

export default Sidebar;
