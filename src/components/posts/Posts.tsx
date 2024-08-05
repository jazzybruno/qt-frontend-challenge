import React from 'react';
import Masonry from 'react-masonry-css';
import PostCard from './PostCard';
import './CardGallery.css'; // Make sure to include your custom CSS
import useGet from '@/hooks/useGet';
import Empty from '../../assets/images/empty.svg'
import { Post } from '@/types/post.type';
import { Button } from '@mantine/core';

function CardGallery() {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
    500: 1,
  };

  const {
    data: posts,
    loading,
    error,
    get,
  } = useGet<Post[]>(
    "/post/all",
    {
      defaultData: [],
    }
  );

  console.log(posts);

  return (
    <>
      {
        posts?.length == 0 ? (
          <div className="w-[100%] flex flex-col justify-center items-center">
            <div className=''>
              <img
                src={Empty}
                className="h-44 w-44 object-cover"
                alt="DMS Logo"
              />
            </div>
            <h1 className='text-3xl mt-10 text-gray-500 font-bold'> No Posts Available</h1>
          </div>
        ) : (
          <div className='md:px-[20%] sm:px-6 flex flex-col gap-3'>
            <div className='flex items-center    w-[100%]'>
              <h1 className='text-3xl mt-10 font-bold'>Posts</h1>
              {/* <Button>
                Add Post
              </Button> */}
            </div>

            {
              posts?.map((post, index) => {
                return (
                  <PostCard post={post} key={index} />
                )
              })
            }

          </div>
        )
      }
    </>
  );
}

export default CardGallery;
