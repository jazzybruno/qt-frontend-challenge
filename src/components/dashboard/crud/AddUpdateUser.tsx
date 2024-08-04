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
    name: user?.name ?? "",
    password: user?.password ?? "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (data.email.trim() === "" || data.name.trim() === "" || data.password.trim() === "") {
      setError("Please fill all required fields");
      return;
    }
    try {
      const res = await AuthAPi.post("/users/create", data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Add User Success",
          message: "Add User Success",
          color: "green",
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Add User Failed",
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
          label="Username"
          description="Username for the user"
        >
          <Input
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            value={data.name}
            placeholder="Username"
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
        <Input.Wrapper w={"100%"} label="Department" description="Department">
        <Input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
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
        {isEdit ? "Update User" : "Add User"}
      </Button>
    </form>
  );
};

export default AddUpdateUser;
