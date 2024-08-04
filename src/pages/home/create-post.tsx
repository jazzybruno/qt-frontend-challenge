import { AuthAPi } from "@/utils/fetcher"
import { Button, Input, InputWrapper, Textarea ,  } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useState } from "react"

const CreatePost = () => {

    const [data , setData] = useState({
        title : '',
        content : ''
    })

    const handlePost = () => {
        if(data.title.trim() == " " || data.content.trim() == " "){
            notifications.show({
                message : "Enter valid post details",
                color: "red"
            })
            return;
        }
        AuthAPi.post('/post/create' , data)
        .then((res)=>{
            notifications.show({
             message : "Successfully Created  Post",
             color: 'green'
            })
            window.location.reload();
         })
         .catch((err)=>{
         notifications.show({
           message : "Failed to Create Post",
           color: 'red'
          })
         })
    }

    return ( 
        <div className="my-2">
           <form action="">
           <Input.Wrapper w={"100%"} className="mt-3" label="Title" description="Title of post">
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

          <Input.Wrapper w={"100%"} className="mt-3" label="Comment" description="Content of post">
          <Textarea
            required
            placeholder="Post Content"
            onChange={(e) => setData({ ...data, content: e.target.value })}
            value={data.content}
            p={2}
            variant="filled"
            size="md"
          />
          </Input.Wrapper>
           </form>

           <Button className="mt-3" fullWidth color='blue' onClick={handlePost}>Create Post</Button>
         
        </div>
     );
}
 
export default CreatePost;