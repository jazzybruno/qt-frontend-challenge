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
import DashboardLayout from "@/layouts/DashboardLayout";
import { Post } from "@/types/post.type";
import { IUser } from "@/types/user.type";
import { humanizeDateFormat } from "@/utils/funcs";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";

type props = {
  isAdmin : boolean
}

const MyPosts = (props : props) => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewUser, setViewUser] = React.useState({
    open: false,
    data: null as any,
  });
  const [isEdit, setIsEdit] = useState({
    status: false,
    data: null as Post | null,
  });
  const [isDelete, setIsDelete] = useState({
    status: false,
    data: null as Post | null,
  });
  const { deleteData, loading: deleteLoading } = useDelete(`/post/delete`);
  const { user } = useAuth();

  const {
    data: posts,
    loading,
    error,
    get,
  } = useGet<Post[]>(
      `${props.isAdmin ? "/post/all" : "/post/user"}`,
    {
      defaultData: [],
    }
  );
  // remove current user from users
  const filteredPosts = posts

  const onEdit = (data: Post) => {
    setIsEdit({
      status: true,
      data,
    });
  };

  const onDelete = (data: Post) => {
    setIsDelete({
      status: true,
      data,
    });
  };

  const columns: Column<Post>[] = [
    {
      name: "Title",
      accessorKey: "title",
    },
    {
      name: "Author",
      accessorKey: "author.fullName",
    },
    {
      name: "Likes",
      accessorKey: "numberOfLikes",
    },
    {
      name: "Comments",
      accessorKey: "numberOfComments",
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
            onClick={() => onEdit(row)}
            variant="transparent"
            color="blue"
            radius="xl"
          >
            <BiEdit />
          </ActionIcon>
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
        {!loading && !error && filteredPosts && (
          <DataTable
            searchKey="title"
            columns={columns}
            data={
                 filteredPosts
            }
            tableClass="flex flex-col justify-center"
          />
        )}
      </div>
      <Drawer
        opened={showDrawer || isEdit.status}
        onClose={() => {
          setShowDrawer(false);
          setIsEdit({ status: false, data: null });
        }}
        padding="md"
        size="md"
        position="right"
        title={
          <span className=" font-semibold">
            {isEdit ? "Edit Post" : "Add User"}
          </span>
        }
      >
        <UpdatePost
          post={isEdit.data}
          isEdit={isEdit.status}
          refetch={get}
          onClose={() => setShowDrawer(false)}
        />
      </Drawer>
      <Drawer
        opened={viewUser.open}
        onClose={() =>
          setViewUser({
            open: false,
            data: null as any,
          })
        }
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> </span>}
      >
        <ViewUser user={viewUser.data} />
      </Drawer>
      <MainModal
        size={"lg"}
        isOpen={isDelete.status}
        title="Delete Post"
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

export default MyPosts;
