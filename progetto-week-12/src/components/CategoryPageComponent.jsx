import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../config';
import SinglePostComponent from './SinglePostComponent';

export default function CategoryPageComponent() {

const {categoryId} = useParams();
const [posts, setPosts] = useState([]);

useEffect(() =>{
    getPosts();
    // console.log(categoryId);
},[]);


const getPosts = () => {
    axios(baseURL + "posts")
    .then(res => setPosts(res.data))
}
 
  return (
    <div className='container my-5'>
    {}
        {posts.length > 0 && posts.filter(post => post.categories.includes(+categoryId)).map(post => <SinglePostComponent post={post} key={post.id} />)}
    </div>
  )
}
