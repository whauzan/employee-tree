"use client";

import { useEmployeeContext } from "@/lib/hooks/useEmployeeContext";
import React, { useLayoutEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";

const EmployeeTree = () => {
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const { state } = useEmployeeContext();

  useLayoutEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
      setDimensions({
        width: dimensions.width,
        height: dimensions.height,
      });
    }
  }, []);

  return (
    <div
      id="treeWrapper"
      className="flex h-[calc(100vh-11rem)] w-full items-center justify-center border"
      ref={treeContainerRef}
    >
      {treeContainerRef.current && (
        <Tree
          hasInteractiveNodes
          data={state[0].employeeTree ?? undefined}
          orientation="vertical"
          pathFunc={"step"}
          dimensions={dimensions}
          draggable={true}
          zoomable={true}
          translate={translate}
        />
      )}
    </div>
  );
};

export default EmployeeTree;
