"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import { useErrorContext } from "@/lib/hooks/useErrorContext";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

const EmployeeInfo = () => {
  const { state } = useEmployeeContext();
  const { error } = useErrorContext();
  const data = state[0];
  const searchParams = useSearchParams();

  if (error) return null;

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Employee Information</CardTitle>
      </CardHeader>
      <CardContent>
        {searchParams.get("employee") ? (
          data.employee ? (
            <div className="">
              <div className="flex gap-x-2">
                <p>Name: </p>
                <p>{capitalizeFirstLetter(data.employee?.name ?? "")}</p>
              </div>
              <div className="flex gap-x-2">
                <p>Position: </p>
                <p>{data.employee?.attributes.position}</p>
              </div>
              <div className="flex gap-x-2">
                <p>Department: </p>
                <p>{data.employee?.attributes.department}</p>
              </div>
              <div className="flex gap-x-2">
                <p>Total Direct Reports: </p>
                <p>{data.totalDirectReports}</p>
              </div>
              <div className="flex gap-x-2">
                <p>Total Indirect Reports: </p>
                <p>{data.totalIndirectReports}</p>
              </div>
              <div className="flex gap-x-2">
                <p>Total Reports: </p>
                <p>{data.totalReports}</p>
              </div>
            </div>
          ) : (
            <p>Employee Not Found</p>
          )
        ) : (
          <p>Select an employee to view their information</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeInfo;
