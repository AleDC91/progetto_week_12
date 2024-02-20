import React from 'react'
import { Form } from 'react-bootstrap'

export default function SearchPostsComponent({setQuery}) {

    const handleChange = (e) => {
        setQuery(e.target.value);
    }



  return (
    <Form className='my-5'>
      <Form.Group className="mb-3">
        <Form.Control 
        type="email" 
        placeholder="search posts..." 
        onChange={(e) => handleChange(e)}
        />
      </Form.Group>
    </Form>
  )
}
