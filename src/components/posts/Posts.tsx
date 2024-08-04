import React from 'react';
import Masonry from 'react-masonry-css';
import PostCard from './PostCard';
import './CardGallery.css'; // Make sure to include your custom CSS

function CardGallery() {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      <PostCard showImage='show' />
      <PostCard showImage='dont' />
      <PostCard showImage='show' />
      <PostCard showImage='show' />
      <PostCard showImage='dont' />
      <PostCard showImage='show' />
      <PostCard showImage='show' />
      <PostCard showImage='dont' />
      <PostCard showImage='show' />
    </Masonry>
  );
}

export default CardGallery;
