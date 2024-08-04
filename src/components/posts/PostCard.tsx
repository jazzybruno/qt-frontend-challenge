import { Card , Avatar , Modal , Image, Text, Badge, Button, Group, ActionIcon, Input, ButtonGroup, Alert } from '@mantine/core';
import { AiOutlineLike, AiOutlineComment, AiOutlineFlag } from 'react-icons/ai';
import { useState } from 'react';
import { Post } from '@/types/post.type';
import { useAuth } from '@/contexts/AuthProvider';
import { notifications } from '@mantine/notifications';
import { AuthAPi, getResError } from '@/utils/fetcher';
import { Comment } from '@/types/comment.type';
import useGet from '@/hooks/useGet';
import { humanizeDate } from '@/utils/funcs';

type Props =  {
    post : Post
}


function PostCard(props : Props) {

    const {user} = useAuth()
    const [modalOpened, setModalOpened] = useState(false);
    const [commentsNumber , setCommentNumber] = useState(props.post.numberOfComments);
    const [likesNumber , setLikesNumber] = useState(props.post.numberOfLikes);
    const [commentModalOpened , setCommentModalOpened] = useState(false)
    const [reportModalOpened , setReportModalOpened] = useState(false)
    const [comments , setComments] = useState<Comment[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [data , setData] = useState({
      comment : ''
    })
    const [reportData , setReportData] = useState({
      title : '',
      description : ''
    })

    const {
      data: comment,
      loading,
      error,
      get,
    } = useGet<Comment[]>(
      `/comment/post/${props.post.id}`,
      {
        defaultData: [],
      }
    );

    const visibleComments = expanded ? comment : comment?.slice(0, 3);

  const handleLike = (post : Post) => {
    if(user?.id == null || user?.id == undefined){
      notifications.show({
        message : "Login to like posts",
        color : "red"
      })
      
  } else{
     AuthAPi.post('/like/create' , {
      postId : post.id
     })
     .then((res)=>{
         notifications.show({
          message : "Successfully Liked Post",
          color: 'green'
         })
         setLikesNumber(likesNumber+1);
     })
     .catch((err)=>{
      notifications.show({
        message : getResError(err) || "Failed to Like Post",
        color: 'red'
       })
     })   
  }
}
  
  const handleComment = () => {
      if(data.comment.trim() == " "){
           notifications.show({
            message : "Please enter a valid comment",
            color: "red"
           })
      }
      AuthAPi.post('/comment/create' , {
        comment : data.comment,
        postId : props.post.id
      })
      .then((res)=>{
        handleCommentCloseModal();
        notifications.show({
         message : "Successfully Commented on Post",
         color: 'green'
        })
        data.comment = '';
        setCommentNumber(commentsNumber + 1)
    })
    .catch((err)=>{
      handleCommentCloseModal();
     notifications.show({
       message : "Failed to comment on Post",
       color: 'red'
      })
    })
  }

  const handleReport = () => {
    if(reportData.description.trim() == " " || reportData.title.trim() == " "){
      notifications.show({
       message : "Please enter a valid report",
       color: "red"
      })
 }
 AuthAPi.post('/abusive-content/create/post' , {
   title : reportData.title,
   description : reportData.description,
   postId : props.post.id
 })
 .then((res)=>{
   handleReportCloseModal();
   notifications.show({
    message : "Successfully Reported  Post",
    color: 'green'
   })
})
.catch((err)=>{
  handleReportCloseModal();
notifications.show({
  message : "Failed to Reported  Post",
  color: 'red'
 })
})
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

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.post.title}</Text>
        <Badge color="pink">{
            humanizeDate(props.post.createdAt)
          }</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.post.content}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={handleOpenModal}>
        Read More
      </Button>

      <Group justify="space-between">
      <Group mt="md" mb="xs" align="center">
        <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/avatar.png" radius="xl" size="md" />
        <Text size="sm" color="dimmed">{props.post.author.fullName}</Text>
      </Group>

      <Group mt="md">
        <div className='flex space-x-2 text-gray-600 justify-center items-center font-bold text-xl'>
          <h1>{likesNumber}</h1>
        <ActionIcon onClick={()=>{
          handleLike(props.post)
        }}>
          <AiOutlineLike />
        </ActionIcon>
        </div>

        <div className='flex space-x-2 text-gray-600 justify-center items-center font-bold text-xl'>
          <h1>{commentsNumber}</h1>
          <ActionIcon onClick={()=>{
            handleCommentOpenModal()
          }}>
          <AiOutlineComment />
        </ActionIcon>
        </div>

        <div className='flex space-x-2 text-gray-600 justify-center items-center font-bold text-xl'>
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
        <Group justify="space-between" mt="md" mb="xs">
        <Group>
        <Avatar
          size={"md"}
          src={`https://ui-avatars.com/api/?name=John&bold=true`}
        />
                <h2 className='text-md'>John Doe</h2>
        </Group>

        <Badge color="pink">{
            humanizeDate(props.post.createdAt)
          }</Badge>
        </Group>
        
         <h1 className='text-black font-bold text-2xl'>
          {props.post.title}
          </h1>
        <Text size="sm" color="dimmed" mt="md">
          {props.post.content}
        </Text>

{/* // comments section  */}
<div className="mt-4 ">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Comments</h2>
      {visibleComments?.map((comment, index) => (
        <div key={index} className="flex flex-col space-y-2 mb-4 ">
          <div className="flex flex-col items-start p-3 space-x-2 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm font-semibold text-gray-800">{comment.author.fullName}</p>
            <p className="text-sm text-gray-600">{comment.comment}</p>
          </div>
        </div>
      ))}
      {visibleComments?.length == 0 ? "No Comments Available" : (
        <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-blue-500 hover:underline"
      >
        {expanded ? 'Show less' : `Show ${comments.length - 3} more`}
      </button>
      )}
    </div>

      </Modal>

{/* // comment modal  */}
      <Modal 
      
      opened={commentModalOpened}
        onClose={handleCommentCloseModal}
        title="Comment Details"
        size="md" >
        <div>
          <form onSubmit={handleComment} className='flex flex-col space-y-3'>
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
          <Button color='blue' onClick={handleComment}>Submit</Button>
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
          <Button color='blue' onClick={handleReport}>Submit</Button>
          </div>
          </form>
        </div>
      </Modal>
    </Card>
  );
}

export default PostCard;