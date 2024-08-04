import { Card , Avatar , Modal , Image, Text, Badge, Button, Group, ActionIcon, Input, ButtonGroup, Alert } from '@mantine/core';
import { AiOutlineLike, AiOutlineComment, AiOutlineFlag } from 'react-icons/ai';
import { useState } from 'react';
import { Post } from '@/types/post.type';
import { useAuth } from '@/contexts/AuthProvider';
import { notifications } from '@mantine/notifications';

type Props =  {
    showImage : string
}

const comments = [
    { username: 'Alice', text: 'Great post! Really enjoyed reading about your adventure.' },
    { username: 'Bob', text: 'Beautiful scenery! Thanks for sharing.' },
    { username: 'Bob', text: 'Beautiful scenery! Thanks for sharing.' },
    { username: 'Bob', text: 'Beautiful scenery! Thanks for sharing.' },
    { username: 'Bob', text: 'Beautiful scenery! Thanks for sharing.' },
    { username: 'Bob', text: 'Beautiful scenery! Thanks for sharing.' },
    { username: 'Bob', text: 'Beautiful scenery! Thanks for sharing.' },
    // Add more comments here
  ];

function PostCard(props : Props) {

    const {user} = useAuth()
    const [modalOpened, setModalOpened] = useState(false);
    const [commentModalOpened , setCommentModalOpened] = useState(false)
    const [reportModalOpened , setReportModalOpened] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const visibleComments = expanded ? comments : comments.slice(0, 3);
    const [data , setData] = useState({
      comment : ''
    })
    const [reportData , setReportData] = useState({
      title : '',
      description : ''
    })

  const handleLike = () => {
    if(user?.id == null || user?.id == undefined){
      notifications.show({
        message : "Login to like posts",
        color : "red"
      })
  } else{
     console.log("Post liked");     
  }
}
  
  const handleComment = (post : Post) => {
      handleOpenModal()
      console.log(post)
  }

  const handleReport = () => {
  }

  const handleReportOpenModal = () => {
    if(user?.id == null || user?.id == undefined){
      notifications.show({
        message : "Login to report post",
        color : "red"
      })
    }else{
    setReportModalOpened(true);
    }
  };

  const handleReportCloseModal = () => {
    if(user?.id == null || user?.id == undefined){
      notifications.show({
        message : "Login to report post",
        color : "red"
      })
    }else{
      setReportModalOpened(false);
    }
  };

    
  const handleCommentOpenModal = () => {
    if(user?.id == null || user?.id == undefined){
      notifications.show({
        message : "Login to add comment",
        color : "red"
      })
    }else{
    setCommentModalOpened(true);
    }
  };

  const handleCommentCloseModal = () => {
    if(user?.id == null || user?.id == undefined){
      notifications.show({
        message : "Login to add comment",
        color : "red"
      })
    }else{
      setCommentModalOpened(false);
    }
  };
  
  const handleOpenModal = () => {
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

 

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
   
        {
            props.showImage == 'show' ? (
                <Card.Section>
                <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
        </Card.Section>
            ) : "" 
        }

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">NEW POST</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={handleOpenModal}>
        Read More
      </Button>

      <Group justify="space-between">
      <Group mt="md" mb="xs" align="center">
        <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/avatar.png" radius="xl" size="md" />
        <Text size="sm" color="dimmed">John Doe</Text>
      </Group>

      <Group mt="md">
        <div className='flex space-x-2 text-gray-600 justify-center items-center font-bold text-xl'>
          <h1>12</h1>
        <ActionIcon onClick={handleLike}>
          <AiOutlineLike />
        </ActionIcon>
        </div>

        <div className='flex space-x-2 text-gray-600 justify-center items-center font-bold text-xl'>
          <h1>12</h1>
          <ActionIcon onClick={handleCommentOpenModal}>
          <AiOutlineComment />
        </ActionIcon>
        </div>

        <div className='flex space-x-2 text-gray-600 justify-center items-center font-bold text-xl'>
          <h1>12</h1>
          <ActionIcon onClick={handleReportOpenModal}>
          <AiOutlineFlag />
        </ActionIcon>
        </div>
      </Group>
      </Group>
      
      <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        title="Post Details"
        size="xl"
      >
        <Group justify="left" mb="md">
        <Avatar
          size={"md"}
          src={`https://ui-avatars.com/api/?name=John&bold=true`}
        />
                <h2 className='text-md'>John Doe</h2>
        </Group>
        {
            props.showImage == 'show' ? (
                <div className='my-5'>
                    <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt="Norway"
              />
                </div>
            ) : "" 
        }
         <h1 className='text-black font-bold text-2xl'>
          Norway Fjord Adventures
          </h1>
        <Text size="sm" color="dimmed" mt="md">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway. With Fjord Tours you can explore more of
          the magical fjord landscapes with tours and activities on and around the fjords of
          Norway. With Fjord Tours you can explore more of the magical fjord landscapes with tours
          and activities on and around the fjords of Norway.
        </Text>

{/* // comments section  */}
<div className="mt-4 ">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Comments</h2>
      {visibleComments.map((comment, index) => (
        <div key={index} className="flex flex-col space-y-2 mb-4 ">
          <div className="flex flex-col items-start p-3 space-x-2 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm font-semibold text-gray-800">{comment.username}</p>
            <p className="text-sm text-gray-600">{comment.text}</p>
          </div>
        </div>
      ))}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-blue-500 hover:underline"
      >
        {expanded ? 'Show less' : `Show ${comments.length - 3} more`}
      </button>
    </div>

      </Modal>

{/* // comment modal  */}
      <Modal 
      
      opened={commentModalOpened}
        onClose={handleCommentCloseModal}
        title="Comment Details"
        size="md" >
        <div>
          <form className='flex flex-col space-y-3'>
          <Input.Wrapper w={"100%"} label="Comment" description="Comment on post">
          <Input
            type="text"
            required
            placeholder="Comment Details"
            onChange={(e) => setData({ ...data, comment: e.target.value })}
            value={data.comment}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
          <div className='flex flex-row justify-between'>
          <Button color='red' onClick={()=>{
            handleCommentCloseModal()
          }}>Cancel</Button>
          <Button color='blue' >Submit</Button>
          </div>
          </form>
        </div>
      </Modal>

      {/* // the report modal  */}
      <Modal 
      
      opened={reportModalOpened}
        onClose={handleReportCloseModal}
        title="Report Details"
        size="md" >
        <div>
          <form className='flex flex-col space-y-3'>
          <Input.Wrapper w={"100%"} label="Title" description="Title of report">
          <Input
            type="text"
            required
            placeholder="Abuse Report Title"
            onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
            value={reportData.title}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>

        <Input.Wrapper w={"100%"} label="Description" description="Description  of Post">
          <Input
            type="text"
            required
            placeholder="Post Description"
            onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
            value={reportData.description}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>

          <div className='flex flex-row justify-between mt-2'>
          <Button color='red' onClick={()=>{
            handleReportCloseModal()
          }}>Cancel</Button>
          <Button color='blue' >Submit</Button>
          </div>
          </form>
        </div>
      </Modal>
    </Card>
  );
}

export default PostCard;