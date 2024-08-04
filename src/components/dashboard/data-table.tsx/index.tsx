"use client";
import { Table, Checkbox, Pagination, useMantineTheme, Input } from "@mantine/core";
import * as React from "react";
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export interface Column<T = any> {
  name: string;
  accessorKey: string;
  renderCell?: (item: T) => React.ReactNode;
}

interface Props {
  data: any[];
  columns: Column[];
  searchKey?: string;
  searchElement?: React.ReactNode;
  paginationProps?: any;
  actionElement?: React.ReactNode;
  minW?: string | number;
  tableClass?: string;
}

function getObjValue(path: string, obj: any): any {
  return path.split('.').reduce((res, key) => res[key], obj);
}

export function DataTable({
  data,
  columns,
  searchKey,
  paginationProps,
  searchElement,
  actionElement,
  minW = 500,
  tableClass = "",
}: Props) {
  const theme = useMantineTheme();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [{ pageIndex, pageSize }, setPagination] = React.useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: paginationProps?.paginateOpts.page ?? 1,
    pageSize: paginationProps?.paginateOpts.limit ?? 6,
  });

  const filteredData = searchKey
    ? data.filter((item) =>
        getObjValue(searchKey, item)
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : data;

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentData = filteredData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: newPage }));
  };

  const rows = currentData.map((item, rowIndex) => (
    <Table.Tr
      key={rowIndex}
      bg={selectedRows.includes(rowIndex) ? theme.colors.blue[0] : ""}
      className="mb-4 last:mb-0 bg-white"
    >
      <Table.Td>
        <Checkbox
          aria-label="Select Row"
          checked={selectedRows.includes(rowIndex)}
          onChange={(event) => {
            setSelectedRows(
              event.currentTarget.checked
                ? [rowIndex, ...selectedRows]
                : selectedRows.filter(
                    (selectedRowIndex) => selectedRowIndex !== rowIndex
                  )
            );
          }}
        />
      </Table.Td>
      <Table.Td>{(pageIndex - 1) * pageSize + rowIndex + 1}</Table.Td>
      {columns.map((column, colIndex) => {
        const cell = column.renderCell
          ? column.renderCell(item)
          : getObjValue(column.accessorKey, item);
        return <Table.Td key={colIndex}>{cell}</Table.Td>;
      })}
    </Table.Tr>
  ));

  return (
    <div className={`w-full text-sm gap-y-5 p-3 ${tableClass}`}>
      <div className="w-full py-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lg:max-w-xs max-w-[16em] w-full rounded-md duration-300"
        />
      </div>

      {searchElement && <div className="mb-4">{searchElement}</div>}
      {actionElement && <div className="mb-4">{actionElement}</div>}
      <div className="w-full overflow-x-auto flex-col items-center">
        <Table.ScrollContainer minWidth={800} type="native" className="min-w-[500px]">
          <Table>
            <Table.Thead className="text-mainPurple">
              <Table.Tr>
                <Table.Th />
                <Table.Th>#</Table.Th>
                {columns.map((column, index) => (
                  <Table.Th key={index}>{column.name}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
      <div className="w-full mt-5 flex items-center justify-center">
        <Pagination
          total={totalPages}
          value={pageIndex}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
