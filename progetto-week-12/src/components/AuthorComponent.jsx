import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../config';
import {Link} from 'react-router-dom';
import "../styles/AuthorComponent.css"

export default function AuthorComponent({authorId}) {

    const [authorName, setAuthorName] = useState("");

    useEffect(() => {
        getAuthorName(authorId);
      }, []);
    
      const getAuthorName = (id) => {
        axios(baseURL + `users/${id}`).then((res) => {
            setAuthorName(res.data.name);
        });
      };



    return ( <Link to={`/author/${authorId}`} className='author-link'>
        {authorName && <div className="author-box">{authorName}</div>}</Link>
      );

}
