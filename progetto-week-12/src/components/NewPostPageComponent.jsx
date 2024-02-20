import React from 'react'
import { Button, Form } from 'react-bootstrap';

export default function NewPostPageComponent() {
  return (
    <main className='container'>
      <Form className="my-5" >
        <Form.Group className="mb-3">
          <Form.Control
            name="title"
            type="text"
            placeholder="Post title..."
            // onChange={(e) => {
            //   handleChange(e);
            // }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="article-body"
            type="textarea"
            placeholder="article HTML..."
            // onChange={(e) => {
            //   handleChange(e);
            // }}
          />
        </Form.Group>


        
        <Button type="submit" variant="success">
          POST
        </Button>
      </Form>
    </main>
  )
}
