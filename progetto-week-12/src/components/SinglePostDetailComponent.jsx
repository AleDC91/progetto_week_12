import React from "react";
import CategoryComponent from "./CategoryComponent";
import AuthorComponent from "./AuthorComponent";
import { format } from "date-fns";
import TagComponent from "./TagComponent";

export default function SinglePostDetailComponent({ post }) {
  const content = post.content.rendered;
  const categories = post.categories;
  const tags = post.tags;
  const date = new Date(post.date);
  const postDate = format(date, "d MMM yyyy");

  return (
    <div className="container my-5">
      <div className="categories-container my-4">
        {categories.map((c) => {
          return <CategoryComponent key={c} categoryId={c} />;
        })}
      </div>
      <h1 className="mb-4">{post.title.rendered}</h1>
      <div className="author-post-container d-flex">
        <p>By:&nbsp;</p>
        <AuthorComponent authorId={post.author} className="ms-3" />
      </div>
      <p>{postDate}</p>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="post-content"
      />
      <div className="categories-container my-4">
      {tags.map((c) => {
        return <TagComponent key={c} tagId={c} />;
      })}
      </div>
    </div>
  );
}
