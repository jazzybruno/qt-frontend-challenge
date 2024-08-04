import AsyncSelect from "@/components/core/AsyncSelect";
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
  user?: IUser | null;
}

const AddUpdateUser: FC<Props> = ({ refetch, onClose, isEdit, user }) => {
  const [data, setData] = React.useState({
    email: user?.email ?? "",
    userName: user?.username ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.telephone ?? ""
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (data.email.trim() === "" || data.userName.trim() === "" || data.firstName.trim() === "" || data.lastName.trim() === "" || data.phoneNumber.trim() === "" ) {
      setError("Please fill all required fields");
      return;
    }
    try {
      const res = await AuthAPi.patch(`/users/update-user/${user?.id}`, data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Update User Success",
          message: "Update User Success",
          color: "green",
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Updated User Failed",
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
      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}
      <div className="flex mt-5 w-full flex-col gap-y-4">
      <Input.Wrapper w={"100%"} label="FirstName" description="FirstName">
          <Input
            type="text"
            required
            placeholder="FirstName"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            value={data.firstName}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>

        <Input.Wrapper w={"100%"} label="Last Name" description="Last Name">
          <Input
            type="text"
            required
            placeholder="LastName"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            value={data.lastName}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Username"
          description="Username for the user"
        >
          <Input
            onChange={(e) => setData({ ...data, userName: e.target.value })}
            required
            value={data.userName}
            placeholder="Username"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Your Telephone" description="Telephone">
          <Input
            type="text"
            required
            placeholder="Telephone"
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            value={data.phoneNumber}
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
        Update User
      </Button>
    </form>
  );
};

export default AddUpdateUser;
