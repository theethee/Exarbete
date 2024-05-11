// https://avancera.app/courses/53df5dd7-c85b-4fe8-8068-ca88fd37e924/720ece58-b44a-40d5-ab17-6196bcca71ac

import { useEffect, useState } from "react";
import "../../src/App.css";

function BlogPublic() {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/blog")
      .then((response) => response.json())
      .then((result) => {
        setBlogPost(result);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Blog Posts</h1>
      </div>
      <div>
        {blogPost.map((post) => (
          <li key={post.id}>
            <h3>{post.blogheadline}</h3>
            <p>{post.blogtext}</p>
          </li>
        ))}
      </div>
    </>
  );
}

export default BlogPublic;
