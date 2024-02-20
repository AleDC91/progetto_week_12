import React from "react";
import CategoryComponent from "./CategoryComponent";
import "../styles/SinglePostComponent.css";
import AuthorComponent from "./AuthorComponent";
import { format } from "date-fns";
import TagComponent from "./TagComponent";
import { Link } from "react-router-dom";

export default function SinglePostComponent({ post }) {
  const excerpt = post.excerpt.rendered;
  const categories = post.categories;
  const author = post.author;
  const date = new Date(post.date);
  const postDate = format(date, "d MMM yyyy");
  const tags = post.tags;

  return (
    <article className="single-post">
      <div className="categories-container">
        {categories.map((c) => {
          return <CategoryComponent key={c} categoryId={c} />;
        })}
      </div>
      <Link to={`/article/${post.id}`} className="text-decoration-none text-black">
      <h2 className="post-title">{post.title.rendered}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: excerpt }}
        className="post-excerpt"
      />
      </Link>
      <div className="post-footer">
        <p>Published: {postDate}</p>
        {author && <AuthorComponent key={author} authorId={author} />}
      </div>
      <div className="tags-container d-flex">
        {tags.length > 0 && (
          <>
            <p className="me-3">Tags: </p>
            <div className="post-tags">
              {tags.map((t) => {
                return <TagComponent key={t} tagId={t} />;
              })}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
