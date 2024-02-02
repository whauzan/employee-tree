"use client";

import { Employee } from "@/data/schema";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "./DataTableColumnHeader";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/utils";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex w-32 items-center gap-x-2">
        <Image
          src={row.original.profilePic}
          width={100}
          height={100}
          alt={row.getValue("name")}
          className="size-10 rounded-full"
        />
        <span className="max-w-[500px] truncate font-medium">
          {capitalizeFirstLetter(row.getValue("name"))}
        </span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("position")}
      </span>
    ),
  },
  {
    accessorKey: "manager",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manager" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("manager") !== ""
          ? capitalizeFirstLetter(row.getValue("manager"))
          : "No Manager"}
      </span>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">
        {row.getValue("department")}
      </span>
    ),
    filterFn: (row, id, filterValue) => {
      console.log(filterValue, row, id);

      return filterValue.includes(row.getValue(id));
    },
  },
];
