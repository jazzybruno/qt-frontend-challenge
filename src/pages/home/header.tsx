import { useAuth } from "@/contexts/AuthProvider";
import { Button , Group , Avatar , Text, ActionIcon, Modal, InputWrapper, Input } from "@mantine/core";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import {humanizeDateFormat } from "@/utils/funcs";
import CreatePost from "./create-post";

const Header = () => {
  const [profileModel , setProfileModal] = useState(false)
  const [createPostModel , setCreatePostModel] = useState(false)

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

    const { user } = useAuth();
    return ( 
        <div className="bg-white  h-20 flex w-[100%] flex-row justify-between px-10 items-center">
            <div
            className={
              "flex gap-3 font-montserrat items-center text-2xl justify-center "
            }
          >
            <img src={"/Logo.png"} width={40} height={40} alt="Logo" />
            QT MEDIA
          </div>

          {
            user?.id != null ? (
                <div className="flex space-x-10 flex-row justify-around">
                <Button onClick={()=>{
                  setCreatePostModel(true)
                }}>Create Post </Button>
                <Button>My Posts</Button>
                <Button>My Reports</Button>
            </div>
            ) : ""
          }

          {
            user?.id != null ? (
                <div className="flex">
                    {/* // link  */}
                    
                    {/* // account  */}
                    <div>
                    <Group justify="space-between">
      <Group mt="md" mb="xs" align="center">
      <Group onClick={()=>{
        setProfileModal(true)
      }}>
      <Avatar
          size={"md"}
          src={`https://ui-avatars.com/api/?name=${user?.fullName}+${user?.email}&bold=true`}
        />
           <Text size="sm" color="dimmed">{user.fullName} </Text>
      </Group>
           <ActionIcon
              variant="transparent"
              onClick={logout}
              className="flex py-2.5 hover:text-primary rounded-md duration-300 items-center gap-3 px-6 hover:bg-accent"
            >
              <LogOutIcon size={20} />
            </ActionIcon>
      </Group>
      </Group>
                    </div>
                </div>
            ) : (<div className="flex flex-row space-x-10">
                {/* // login details  */}
                <div>
                    <a className="bg-pink-600 text-white py-2 px-6 font-bold rounded-md" href="/auth/login">Login</a>
                </div>
                <div>
                    <a className="bg-pink-600 text-white py-2 px-6 font-bold rounded-md" href="/auth/signup">Signup</a>
                </div>
              </div>)
          }
 
           {/* // the profile model  */}
          <Modal 
            opened={profileModel}
            size={"xl"}
            onClose={()=>{
              setProfileModal(false)
            }}
            >
                <div className="w-full h-full flex p-4 flex-col items-center">
        <div className=" border-mainblue border-2 rounded-full mb-2">
          <img
            className=" rounded-full w-40"
            src={`https://ui-avatars.com/api/?name=${user?.fullName}+${user?.email}&bold=true`}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full items-center  mx-auto max-w-[800px]">
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

          <Modal
            opened={createPostModel}
            size={'lg'}
            title={
              <div
              className={
                "flex gap-3 font-montserrat items-center text-2xl justify-center "
              }
            >
              <img src={"/Logo.png"} width={40} height={40} alt="Logo" />
              QT MEDIA
            </div>
            }
            onClose={()=>{
              setCreatePostModel(false)
            }}
          >
            {/* The create post model  */}
            <CreatePost />
          </Modal>
            </div>

     );
}
 
export default Header;