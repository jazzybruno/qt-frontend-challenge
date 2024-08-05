import { useAuth } from "@/contexts/AuthProvider";
import { Button, Group, Avatar, Text, ActionIcon, Modal, InputWrapper, Input, Menu, Burger, Drawer } from "@mantine/core";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { humanizeDateFormat } from "@/utils/funcs";
import CreatePost from "./create-post";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type props = {
  handleChangeShow: (option: number) => void;
};

const Header = (props: props) => {
  const [profileModel, setProfileModal] = useState(false);
  const [createPostModel, setCreatePostModel] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  const { user } = useAuth();
  return (
    <div className="bg-white h-20 flex w-full flex-row justify-between px-4 md:px-10 items-center">
      <div
        onClick={() => {
          props.handleChangeShow(1);
        }}
        className="flex gap-3 font-montserrat items-center text-2xl justify-center hover:cursor-pointer"
      >
        <img src="/Logo.png" width={40} height={40} alt="Logo" /> 
        <span className="hidden text-sm font-black text-blue-600 underline underline-offset-8 md:block">QT MEDIA</span>
      </div>

      <div className="flex md:hidden">
        <Burger opened={drawerOpened} onClick={() => setDrawerOpened((o) => !o)} />
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="xl"
        size="full"
      >
        <div className="flex flex-col items-center space-y-4">
          {user?.id != null ? (
            <>
              <button className="border bg-transparent border-blue-500 py-3 rounded-lg px-2 text-blue-500" onClick={() => setCreatePostModel(true)}>Create Post</button>
              <button onClick={() => props.handleChangeShow(2)}>My Posts</button>
              <button onClick={() => props.handleChangeShow(3)}>My Reports</button>
              <Group onClick={() => setProfileModal(true)} className="cursor-pointer flex-col items-center space-y-2">
                <Avatar
                  size={"md"}
                  src={`https://ui-avatars.com/api/?name=${user?.fullName}+${user?.email}&bold=true`}
                />
                {/* <Text size="sm" color="dimmed">
                  {user.fullName}
                </Text> */}
              </Group>
              <Button fullWidth variant="outline" color="red" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <a className="bg-blue-500 text-white py-2 px-6 font-bold rounded-md" href="/auth/login">Login</a>
              <a className="bg-blue-500 text-white py-2 px-6 font-bold rounded-md" href="/auth/signup">Signup</a>
            </>
          )}
        </div>
      </Drawer>

      <div className="hidden md:flex flex-row justify-around items-center space-x-10">
        {user?.id != null ? (
          <>
            <button className="border bg-transparent text-blue-500 border-blue-500 rounded-lg py-2 px-4" onClick={() => setCreatePostModel(true)}>Create Post</button>
            <button onClick={() => props.handleChangeShow(2)}>My Posts</button>
            <button onClick={() => props.handleChangeShow(3)}>My Reports</button>
            <Group justify="space-between">
              <Group mt="md" mb="xs" align="center">
                <Group
                  onClick={() => setProfileModal(true)}
                  className="cursor-pointer"
                >
                  <UserCircleIcon width={32} height={32} className="stroke-slate-500" />
                  <div>
                    <Text size="sm" color="dimmed">
                      {user.fullName}
                    </Text>
                    <p  className="text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </Group>
                <ActionIcon
                  variant="transparent"
                  onClick={logout}
                  className="flex py-2.5 hover:text-primary rounded-md duration-300 items-center gap-3 px-4 hover:bg-accent"
                >
                  <LogOutIcon color="red" size={16} width={20} />
                </ActionIcon>
              </Group>
            </Group>
          </>
        ) : (
          <div className="flex flex-row space-x-10">
            <a className="bg-blue-500 text-white py-2 px-6  rounded-md" href="/auth/login">Login</a>
            <a className="bg-blue-500 text-white py-2 px-6  rounded-md" href="/auth/signup">Signup</a>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <Modal
        opened={profileModel}
        size={"xl"}
        onClose={() => setProfileModal(false)}
      >
        <div className="w-full h-full flex p-4 flex-col items-center">
          <div className="border-mainblue border-2 rounded-full mb-2">
            <img
              className="rounded-full w-40"
              src={`https://ui-avatars.com/api/?name=${user?.fullName}+${user?.email}&bold=true`}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full items-center mx-auto max-w-[800px]">
            <div className="grid w-full gap-6 sm:grid-cols-2">
              <InputWrapper label="Username" description="Username">
                <Input value={user?.username} disabled type={"text"} />
              </InputWrapper>
              <InputWrapper label="Email" description="Email">
                <Input value={user?.email} disabled type={"text"} />
              </InputWrapper>
              <InputWrapper label="Phone Number" description="Phone Number">
                <Input value={user?.telephone} disabled type={"text"} />
              </InputWrapper>
              <InputWrapper label="Full Name" description="Full Name">
                <Input value={user?.fullName} disabled type={"text"} />
              </InputWrapper>
              <InputWrapper label="Date Of Birth" description="Date Of Birth">
                <Input value={humanizeDateFormat(user?.dateOfBirth || "Something") || ""} disabled type={"text"} />
              </InputWrapper>
            </div>
          </div>
        </div>
      </Modal>

      {/* Create Post Modal */}
      <Modal
        opened={createPostModel}
        size={"lg"}
        title={
          <div className="flex gap-3 font-montserrat items-center text-2xl justify-center">
            <img src="/Logo.png" width={40} height={40} alt="Logo" />
            QT MEDIA
          </div>
        }
        onClose={() => setCreatePostModel(false)}
      >
        <CreatePost />
      </Modal>
    </div>
  );
};

export default Header;
