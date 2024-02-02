"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import { useErrorContext } from "@/lib/hooks/useErrorContext";
import Tree from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import { useEmployeeTree } from "@/lib/hooks/useEmployeeTree";
import { Employee as EmployeeSchema } from "@/data/schema";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { useSearchInput } from "@/lib/hooks/useSearchInput";
import { Card, CardContent } from "../../../components/ui/Card";

interface EmployeeTreeProps {
  searchParams: { [key: string]: string | undefined };
  employees: EmployeeSchema[];
}

const EmployeeTree = ({ searchParams, employees }: EmployeeTreeProps) => {
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const { state } = useEmployeeContext();
  const { error } = useErrorContext();

  const { search, handleInputChange } = useSearchInput(
    searchParams.employee ?? "",
  );

  useEmployeeTree({ employees, searchParams });

  useLayoutEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      translateRef.current = {
        x: dimensions.width / 2,
        y: dimensions.height / 2.5,
      };
      dimensionsRef.current = {
        width: dimensions.width,
        height: dimensions.height,
      };
    }
  }, [error]);

  if (error) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative w-60 sm:w-80">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for an employee"
          onChange={handleInputChange}
          value={search}
          type="text"
          className="pl-10"
        />
      </div>
      <Card className="bg-white">
        <CardContent>
          <div
            id="treeWrapper"
            className="flex h-[32rem] w-full items-center justify-center"
            ref={treeContainerRef}
          >
            {treeContainerRef.current && state[0].employeeTree && (
              <Tree
                hasInteractiveNodes
                data={state[0].employeeTree ?? undefined}
                orientation="vertical"
                pathFunc={"step"}
                dimensions={dimensionsRef.current}
                draggable={true}
                zoomable={true}
                translate={translateRef.current}
                nodeSize={{ x: 150, y: 200 }}
                renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
                  <CustomTreeNode
                    nodeData={nodeDatum}
                    triggerNodeToggle={toggleNode}
                    foreignObjectProps={{
                      width: 200,
                      height: 200,
                      x: -100,
                      y: -90,
                    }}
                  />
                )}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        *Note: You can drag and zoom the tree
      </p>
    </div>
  );
};

export default EmployeeTree;
