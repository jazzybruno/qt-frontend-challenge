import CardGallery from "@/components/posts/Posts";
import Header from "./header";
import MyPosts from "./my-posts";
import MyReports from "./my-reports";
import { useState } from "react";

const Home = () => {
  const [show, setShow] = useState(1);

  const handleChangeShow = (option: number) => {
    setShow(option);
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header handleChangeShow={handleChangeShow} />
      </div>
      <div className="flex flex-col bg-gray-50 p-4 md:p-10 mt-20">
        {show == 1 ? (
          <CardGallery />
        ) : show == 2 ? (
          <MyPosts isAdmin={false} />
        ) : (
          <MyReports isAdmin={false} />
        )}
      </div>
    </div>
  );
};

export default Home;
