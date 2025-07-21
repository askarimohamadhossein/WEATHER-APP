"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

const defaultData: Person[] = [
  { firstName: "John", lastName: "Doe", age: 28 },
  { firstName: "Jane", lastName: "Smith", age: 34 },
  { firstName: "Alice", lastName: "Johnson", age: 45 },
  { firstName: "Bob", lastName: "Brown", age: 23 },
  { firstName: "Charlie", lastName: "Davis", age: 30 },
  { firstName: "Eve", lastName: "Wilson", age: 29 },
  { firstName: "Frank", lastName: "Garcia", age: 40 },
  { firstName: "Grace", lastName: "Martinez", age: 50 },
  { firstName: "Hank", lastName: "Lopez", age: 38 },
  { firstName: "Ivy", lastName: "Gonzalez", age: 32 },
  { firstName: "Jack", lastName: "Perez", age: 27 },
  { firstName: "Kathy", lastName: "Roberts", age: 36 },
  { firstName: "Leo", lastName: "Turner", age: 41 },
  { firstName: "Mia", lastName: "Phillips", age: 22 },
  { firstName: "Nina", lastName: "Campbell", age: 31 },
  { firstName: "Oscar", lastName: "Parker", age: 39 },
  { firstName: "Paul", lastName: "Evans", age: 26 },
  { firstName: "Quinn", lastName: "Edwards", age: 35 },
  { firstName: "Rita", lastName: "Collins", age: 42 },
  { firstName: "Sam", lastName: "Stewart", age: 24 },
  { firstName: "Tina", lastName: "Sanchez", age: 37 },
  { firstName: "Ursula", lastName: "Morris", age: 44 },
  { firstName: "Victor", lastName: "Rogers", age: 33 },
  { firstName: "Wendy", lastName: "Reed", age: 25 },
  { firstName: "Xander", lastName: "Cook", age: 46 },
  { firstName: "Yara", lastName: "Morgan", age: 48 },
  { firstName: "Zane", lastName: "Bell", age: 49 },
  { firstName: "Aaron", lastName: "Murphy", age: 21 },
  { firstName: "Bella", lastName: "Rivera", age: 43 },
  { firstName: "Cody", lastName: "Cooper", age: 47 },
  { firstName: "Diana", lastName: "Richardson", age: 19 },
  { firstName: "Ethan", lastName: "Wood", age: 20 },
  { firstName: "Fiona", lastName: "Watson", age: 51 },
];

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
];

export default function BasicTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: defaultData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          table.setColumnFilters([
            {
              id: "lastName",
              value: e.target.value,
            },
            { id: "firstName", value: e.target.value },
          ]);
        }}
      />
      <button
        onClick={() => {
          table.setSorting([
            {
              id: "age",
              desc: true,
            },
          ]);
        }}
      >
        sort Descending
      </button>

      <button
        onClick={() => {
          table.setSorting([
            {
              id: "age",
              desc: false,
            },
          ]);
        }}
      >
        sort Ascending
      </button>
      <table className="table-auto border border-gray-300 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
