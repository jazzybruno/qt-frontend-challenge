import { Skeleton } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { Column } from '../dashboard/data-table.tsx';
interface Props {
  columns: Column[];
}

const TableSkeleton: FC<Props> = ({ columns }) => {
  return (
    <table className="w-full text-sm rounded-lg text-[rgba(67,67,67,0.71)]">
      <thead>
        <tr className="bg-[rgba(237,238,243)] text-[rgba(48,7,98,0.8)] py-10 rounded-md">
          <th className="p-3 border-[#F7F8FD] border-y-[5px] rounded-l-xl">
            <Skeleton height={30} />
          </th>
          <th className="p-2 border-[#F7F8FD] border-y-[5px] rounded-l-xl">
            <Skeleton height={30} />
          </th>
          {columns.map((column, i) => (
            <th
              key={i}
              className="p-3 font-semibold whitespace-nowrap border-[#F7F8FD] border-y-[5px] "
            >
              {/* {(column as any).accessorKey
                ?.replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str: any) => str.toUpperCase()) ?? `Header ${i}`} */}
                <Skeleton height={30} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(10)].map((_, index) => (
          <tr key={index} className="">
            <td>
              <Skeleton height={40} />
            </td>
            <td>
              <Skeleton height={40} />
            </td>
            {columns.map((column, i) => (
              <td key={i} className="p-2">
                <Skeleton height={40} />
              </td>
            ))}
            <Skeleton height={40} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
