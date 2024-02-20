import React, { useEffect, useState } from 'react'
import { baseURL } from '../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TagComponent({tagId}) {
    const [tagName, setTagName] = useState("");

    useEffect(() => {
      getTagName(tagId);
    }, []);
  
    const getTagName = (id) => {
      axios(baseURL + `tags/${id}`).then((res) => {
        setTagName(res.data.name);
      });
    };
  
    return (
      <Link to={`/tag/${tagId}` } className="me-2">{tagName && <div className="tag-box">{tagName}</div>}</Link>
    );
}
