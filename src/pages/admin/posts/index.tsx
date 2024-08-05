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
import MyPosts from "@/pages/home/my-posts";
import { IUser } from "@/types/user.type";
import { humanizeDateFormat } from "@/utils/funcs";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";

const Posts = () => {
  return(
  <DashboardLayout>
    <MyPosts isAdmin={true} />
    </DashboardLayout>
  );
};

export default Posts;
