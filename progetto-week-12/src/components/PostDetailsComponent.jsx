import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../config';
import SinglePostDetailComponent from './SinglePostDetailComponent';


export default function PostDetailsComponent() {

const {articleId} = useParams();

const [post, setPost] = useState();

useEffect(() => {
    getPost();
}, [])

const getPost = () => {
    axios(baseURL + `posts/${articleId}`)
    .then(res => setPost(res.data))
}


  return (
    <div>{post && <SinglePostDetailComponent post={post} />}</div>
  )
}
