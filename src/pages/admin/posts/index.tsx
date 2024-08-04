import DeleteForm from "@/components/core/DeleteForm";
import MainModal from "@/components/core/MainModal";
import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateUser from "@/components/dashboard/crud/AddUpdateUser";
import ViewUser from "@/components/dashboard/crud/ViewUser";
import { Column, DataTable } from "@/components/dashboard/data-table.tsx";
import CardGallery from "@/components/posts/Posts";
import { useAuth } from "@/contexts/AuthProvider";
import useDelete from "@/hooks/useDelete";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IUser } from "@/types/user.type";
import { humanizeDateFormat } from "@/utils/funcs";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";

const Posts = () => {
  const [viewUser, setViewUser] = useState({
    open: false,
    data: null as IUser | null,
  });
  const [isEdit, setIsEdit] = useState({
    status: false,
    data: null as IUser | null,
  });
  const [isDelete, setIsDelete] = useState({
    status: false,
    data: null as IUser | null,
  });
  const { deleteData, loading: deleteLoading } = useDelete(`/users/delete-user`);
  const { user } = useAuth();

  const {
    data: users,
    loading,
    error,
    get,
  } = useGet<IUser[]>("/post/all", {
    defaultData: [],
  });

  // remove current user from users
  const filteredUsers = users?.filter((u) => u.id !== user?.id);

  const onDelete = (data: IUser) => {
    setIsDelete({
      status: true,
      data,
    });
  };

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col p-3">
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
      </div>
      <div className="p-10">
        <CardGallery />
      </div>
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
          title={isDelete.data?.fullName}
          loading={deleteLoading}
        />
      </MainModal>
    </DashboardLayout>
  );
};

export default Posts;
