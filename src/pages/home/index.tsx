import CardGallery from "@/components/posts/Posts";
import { useAuth } from "@/contexts/AuthProvider";
import { Group } from '@mantine/core';
import Header from "./header";

const Home = () => {
    return ( 
        <div  className="relative">
            <div className=""><Header /></div>
            <div className="flex flex-row bg-gray-50 p-10">
            <CardGallery />
            </div>
        </div>
     );
}
 
export default Home;