import Image from "next/image";
import React, { SVGProps } from "react";
import { TreeNodeDatum } from "react-d3-tree";

const CustomTreeNode = ({
  nodeData,
  triggerNodeToggle,
  foreignObjectProps,
}: {
  nodeData: TreeNodeDatum;
  triggerNodeToggle: () => void;
  foreignObjectProps: SVGProps<SVGForeignObjectElement>;
}) => {
  return (
    <React.Fragment>
      <foreignObject {...foreignObjectProps} onClick={triggerNodeToggle}>
        <div className="flex flex-col items-center bg-[#F0F5F9]">
          <Image
            src={nodeData.attributes?.profilePic.toString() || ""}
            alt="Profile"
            width={40}
            height={40}
            className="size-20 rounded-full"
          />
          <div className="text-center">
            <h3>
              {nodeData.name?.charAt(0).toUpperCase() + nodeData.name?.slice(1)}
            </h3>
            <p>{nodeData.attributes?.position}</p>
          </div>
        </div>
      </foreignObject>
    </React.Fragment>
  );
};

export default CustomTreeNode;
