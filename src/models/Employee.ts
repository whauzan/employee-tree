import { IEmployee } from "@/interfaces/Employee";
import { RawNodeDatum } from "react-d3-tree";

type EmployeeType = IEmployee & {
  children: EmployeeType[];
  toRawNodeDatum: () => RawNodeDatum;
};

export class Employee implements IEmployee {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public name: string,
    public attributes: {
      id: number;
      managerId: number | null;
      position: string;
      bio: string;
      profilePic: string;
    },
    public children: EmployeeType[] = [],
  ) {}

  toRawNodeDatum(): RawNodeDatum {
    const { name, children } = this;
    const rawNodeDatum: RawNodeDatum = { name, attributes: {}, children: [] };

    rawNodeDatum.attributes = {
      id: this.attributes.id,
      managerId: this.attributes.managerId ?? "",
      position: this.attributes.position,
      bio: this.attributes.bio,
      profilePic: this.attributes.profilePic,
    };

    if (children) {
      rawNodeDatum.children = children.map((child) => child.toRawNodeDatum());
    }

    return rawNodeDatum;
  }
}
