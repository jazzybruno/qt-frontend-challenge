import DeleteForm from "@/components/core/DeleteForm";
import MainModal from "@/components/core/MainModal";
import TableSkeleton from "@/components/core/TableSkeleton";
import ViewEmployee from "@/components/dashboard/crud/ViewEmployee";
import AddUpdateEmployee from "@/components/dashboard/crud/AddUpdateEmployee";
import { Column, DataTable } from "@/components/dashboard/data-table.tsx";
import useDelete from "@/hooks/useDelete";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { EmployeeLaptop } from "@/types/employee-laptop.type";
import { IUser } from "@/types/user.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";

const EmployeeLaptopPage = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewEmployee, setViewUser] = React.useState({
    open: false,
    data: null as any,
  });
  const [isEdit, setIsEdit] = useState({
    status: false,
    data: null as EmployeeLaptop | null,
  });
  const [isDelete, setIsDelete] = useState({
    status: false,
    data: null as EmployeeLaptop | null,
  });
  const { deleteData, loading: deleteLoading } = useDelete("/employee-laptop/delete");

  const {
    data: employees_data,
    loading,
    error,
    get,
  } = useGet<IUser[]>(
    "/employee-laptop/all",
    {
      defaultData: [],
    }
  );
  // remove current user from users
  const filteredEmployees = employees_data;

  const onEdit = (data: EmployeeLaptop) => {
    setIsEdit({
      status: true,
      data,
    });
  };

  const onDelete = (data: EmployeeLaptop) => {
    setIsDelete({
      status: true,
      data,
    });
  };

  const columns: Column<EmployeeLaptop>[] = [
    {
      name: "First Name",
      accessorKey: "firstname",
    },
    {
      name: "Last Name",
      accessorKey: "lastname",
    },
    {
      name: "NID",
      accessorKey: "nationalIdentity",
    },
    {
      name: "Phone Number",
      accessorKey: "telephone",
    },
    {
      name: "Email",
      accessorKey: "email",
    },
    {
      name: "Department",
      accessorKey: "department",
    },
    {
      name: "Position",
      accessorKey: "position",
    },
    {
      name: "Manufacturer",
      accessorKey: "laptopManufacturer",
    },
    {
      name: "Model",
      accessorKey: "model",
    },
    {
      name: "Serial Number",
      accessorKey: "serialNumber",
    },
    {
      name: "Actions",
      accessorKey: "class",
      renderCell: (row) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon
            variant="transparent"
            color="black"
            onClick={() =>
              setViewUser({
                open: true,
                data: row,
              })
            }
          >
            <AiOutlineEye />
          </ActionIcon>
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
    <DashboardLayout
      right={
          <Button
            size="md"
            onClick={() =>{
              setIsEdit({
                status : false,
                data : null
              })
              setShowDrawer(true)
            }}
            radius={"md"}
            className=" duration-300"
          >
            + Add Employee Laptop
          </Button>
      }
    >
      <div className=" w-full flex  overflow-x-auto p-3">
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
        {!loading && !error && filteredEmployees && (
          <DataTable
            searchKey="firstname"
            columns={columns}
            data={
              filteredEmployees
            }
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
            {isEdit.status ? "Edit Employee Laptop" : "Add Employee Laptop"}
          </span>
        }
      >
        <AddUpdateEmployee
          employee={isEdit.data}
          isEdit={isEdit.status}
          refetch={get}
          onClose={() => setShowDrawer(false)}
        />
      </Drawer>
      <Drawer
        opened={viewEmployee.open}
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
        <ViewEmployee employee={viewEmployee.data} />
      </Drawer>
      <MainModal
        size={"lg"}
        isOpen={isDelete.status}
        title="Delete Course"
        onClose={() => setIsDelete({ status: false, data: null })}
      >
        const 
        <DeleteForm
          onCancel={() => setIsDelete({ status: false, data: null })}
          onDelete={async () => {
            await deleteData(isDelete.data?.id);
            setIsDelete({ status: false, data: null });
            get();
          }}
          title={isDelete.data?.firstname ?? "" + isDelete.data?.lastname ?? ""}
          loading={deleteLoading}
        />
      </MainModal>
    </DashboardLayout>
  );
};

export default EmployeeLaptopPage;
