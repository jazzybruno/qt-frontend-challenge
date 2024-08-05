import DeleteForm from "@/components/core/DeleteForm";
import MainModal from "@/components/core/MainModal";
import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateUser from "@/components/dashboard/crud/AddUpdateUser";
import UpdatePost from "@/components/dashboard/crud/UpdatePost";
import ViewUser from "@/components/dashboard/crud/ViewUser";
import { Column, DataTable } from "@/components/dashboard/data-table.tsx";
import { useAuth } from "@/contexts/AuthProvider";
import useDelete from "@/hooks/useDelete";
import useGet from "@/hooks/useGet";
import { Post } from "@/types/post.type";
import { Report } from "@/types/report.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";

type props = {
  isAdmin : boolean
}

const MyReports = (props : props) => {
  const [isDelete, setIsDelete] = useState({
    status: false,
    data: null as Report | null,
  });
  const { deleteData, loading: deleteLoading } = useDelete(`/abusive-content/delete`);

  const {
    data: reports,
    loading,
    error,
    get,
  } = useGet<Report[]>(
    `${
      props.isAdmin ? "/abusive-content/all" : "/abusive-content/all/user"
    }`,
    {
      defaultData: [],
    }
  );
  // remove current user from users
  const filteredreport = reports


  const onDelete = (data: Report) => {
    setIsDelete({
      status: true,
      data,
    });
  };

  const columns: Column<Report>[] = [
    {
      name: "Title",
      accessorKey: "title",
    },
    {
      name: "Description",
      accessorKey: "description",
    },
    {
      name: "Author",
      accessorKey: "author.fullName",
    },
    {
      name: "Post",
      accessorKey: "post.title",
    },
    {
      name: "Created At",
      accessorKey: "createdAt",
    },
    {
      name: "Actions",
      accessorKey: "class",
      renderCell: (row) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon
            onClick={() => onDelete(row)}
            variant="transparent"
            color="red"
            radius="xl"
          >
            <BiTrash />
          </ActionIcon>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col p-3">
        {loading && <TableSkeleton columns={columns} />}
        {error && (
          <div className="flex flex-col items-center w-full">
            <span className="flex items-center justify-center text-red-700 text-sm">
              {error}
            </span>
            <Button
              onClick={get}
              mt={3}
              className="flex items-center gap-x-2"
              px={3}
            >
              <AiOutlineReload
                size={20}
                className={`mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Retry
            </Button>
          </div>
        )}
        {!loading && !error && filteredreport && (
          <div className="bg-white">
          <DataTable
            searchKey="title"
            columns={columns}
            data={
                 filteredreport
            }
            tableClass="flex flex-col justify-center"
          />
            </div>

        )}
      </div>
      <MainModal
        size={"lg"}
        isOpen={isDelete.status}
        title="Delete Report"
        onClose={() => setIsDelete({ status: false, data: null })}
      >
        <DeleteForm
          onCancel={() => setIsDelete({ status: false, data: null })}
          onDelete={async () => {
            await deleteData(isDelete.data?.id);
            setIsDelete({ status: false, data: null });
            get();
          }}
          title={isDelete.data?.title}
          loading={deleteLoading}
        />
      </MainModal>
    </>
  );
};

export default MyReports;
