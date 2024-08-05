import AsyncSelect from "@/components/core/AsyncSelect";
import { Post } from "@/types/post.type";
import { IUser } from "@/types/user.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";
import { BsFillCameraFill } from "react-icons/bs";

interface Props {
  refetch: () => void;
  onClose: () => void;
  isEdit?: boolean;
  post?: Post | null;
}

const UpdatePost: FC<Props> = ({ refetch, onClose, isEdit, post }) => {
  const [data, setData] = React.useState({
    title: post?.title ?? "",
    content: post?.content ?? "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (data.title.trim() === "" || data.content.trim() === "") {
      setError("Please fill all required fields");
      return;
    }
    try {
      const res = await AuthAPi.put(`/post/update/${post?.id}`, data);
      if (res.data) {
        notifications.show({
          title: "Update Post Success",
          message: "Update Post Success",
          color: "green",
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Updated Post Failed",
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
      <Input.Wrapper w={"100%"} label="Title" description="Title of the post">
          <Input
            type="text"
            required
            placeholder="Post Title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            value={data.title}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>

        <Input.Wrapper w={"100%"} label="Content" description="Post Content">
          <Textarea
            required
            placeholder="Post Content Here"
            onChange={(e) => setData({ ...data, content: e.target.value })}
            value={data.content}
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
        Update Post
      </Button>
    </form>
  );
};

export default UpdatePost;
