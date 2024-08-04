import AsyncSelect from "@/components/core/AsyncSelect";
import { EmployeeLaptop } from "@/types/post.type";
import { IUser } from "@/types/user.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";
import { BsFillCameraFill } from "react-icons/bs";

interface Props {
  refetch: () => void;
  onClose: () => void;
  isEdit?: boolean;
  employee?: EmployeeLaptop | null;
}

const AddUpdateEmployee: FC<Props> = ({ refetch, onClose, isEdit, employee }) => {
  const [data, setData] = React.useState({
    firstname : employee?.firstname ?? "",
    lastname : employee?.lastname?? "",
    nationalIdentity: employee?.nationalIdentity?? "",
    telephone: employee?.telephone??"",
    email: employee?.email ?? "",
    department: employee?.department ?? "",
    position: employee?.position ?? "",
    laptopManufacturer: employee?.laptopManufacturer ?? "",
    model: employee?.model ?? "",
    serialNumber: employee?.serialNumber ?? ""
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const requiredFields = ['firstname', 'lastname', 'nationalIdentity' , 'telephone' , 'email', 'department' , 'position' , 'laptopManufacturer' , 'model' , 'serialNumber']; // Add other required fields if needed

    for (const field of requiredFields) {
      if (data[field].trim() === "") {
        setError("Please fill all required fields");
        return;
    }
  }
    try {
       if (isEdit){
        const res = await AuthAPi.put(`/employee-laptop/update/${employee?.id}`, data);
        console.log(res);
        if (res.data) {
          notifications.show({
            title: "Update Employee Laptop Success",
            message: "Update Employee Laptop Success",
            color: "green",
          });
        }
       }else{
        const res = await AuthAPi.post("/employee-laptop/create", data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Add Employee Laptop Success",
          message: "Add Employee Laptop Success",
          color: "green",
        });
      }
       }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Add Employee Laptop Failed",
        message: getResError(error),
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" w-full flex-col flex gap-y-4 py-4 items-center"
    >
      {/* <input type="file" id="photo" hidden />
      <label
        htmlFor="photo"
        className=" cursor-pointer w-32 aspect-square bg-foreground rounded-full flex justify-center items-center"
      >
        <BsFillCameraFill size={25} />
      </label> */}
      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper
          w={"100%"}
          label="First Name"
          description="First name for the employee"
        >
          <Input
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
            required
            value={data.firstname}
            placeholder="First Name"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Last Name"
          description="Username for the user"
        >
          <Input
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
            required
            value={data.lastname}
            placeholder="Last Name"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="NID"
          description="National ID for the user"
        >
          <Input
            onChange={(e) => setData({ ...data, nationalIdentity: e.target.value })}
            required
            value={data.nationalIdentity}
            placeholder="Nation Identity"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Phone Number"
          description="Phone Number for the user"
        >
          <Input
            onChange={(e) => setData({ ...data, telephone: e.target.value })}
            required
            value={data.telephone}
            placeholder="Phone Number"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Your Email" description="Email">
          <Input
            type="email"
            required
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Department"
          description="Department for the Employee"
        >
          <Input
            onChange={(e) => setData({ ...data, department: e.target.value })}
            required
            value={data.department}
            placeholder="Department"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Position"
          description="position for the employee"
        >
          <Input
            onChange={(e) => setData({ ...data, position: e.target.value })}
            required
            value={data.position}
            placeholder="Position"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Manufacturer"
          description="Laptop manufacturer for the employee"
        >
          <Input
            onChange={(e) => setData({ ...data, laptopManufacturer: e.target.value })}
            required
            value={data.laptopManufacturer}
            placeholder="Manufacturer"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Model"
          description="model for the laptop for the employee"
        >
          <Input
            onChange={(e) => setData({ ...data, model: e.target.value })}
            required
            value={data.model}
            placeholder="Model"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Serial Number"
          description="Serial Number of the laptop for the Employee"
        >
          <Input
            onChange={(e) => setData({ ...data, serialNumber: e.target.value })}
            required
            value={data.serialNumber}
            placeholder="Serial Number"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
      </div>
      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        radius="md"
        w={"100%"}
        size="md"
        mt={8}
        className=" w-full bg-primary text-white"
      >
        {isEdit ? "Update Employee Laptop" : "Add Employee Laptop"}
      </Button>
    </form>
  );
};

export default AddUpdateEmployee;