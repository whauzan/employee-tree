"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import { useErrorContext } from "@/lib/hooks/useErrorContext";
import Tree from "react-d3-tree";
import CustomTreeNode from "../CustomTreeNode";

const EmployeeTree = () => {
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const { state } = useEmployeeContext();
  const { error } = useErrorContext();

  useLayoutEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      translateRef.current = {
        x: dimensions.width / 2,
        y: dimensions.height / 4,
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
    <div
      id="treeWrapper"
      className="flex h-[calc(100vh-11rem)] w-full items-center justify-center border"
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
          nodeSize={{ x: 200, y: 250 }}
          renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
            <CustomTreeNode
              nodeData={nodeDatum}
              triggerNodeToggle={toggleNode}
              foreignObjectProps={{
                width: 200,
                height: 200,
                x: -100,
                y: -100,
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default EmployeeTree;
