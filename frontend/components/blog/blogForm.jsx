import { useEffect, useState } from "react";

function BlogForm() {
  // const [file, setFile] = useState(null);
  const [blogtext, setblogtext] = useState("");
  const [blogheadline, setblogheadline] = useState("");
  const [image, setimage] = useState("");
  const [blogPost, setBlogPost] = useState([]);

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleHeadline = (e) => {
    setblogheadline(e.target.value);
  };

  const handleDescription = (e) => {
    setblogtext(e.target.value);
  };

  const uploadURL = "http://localhost:3001/blog";

  useEffect(() => {
    fetch("http://localhost:3001/blog")
      .then((response) => response.json())
      .then((result) => {
        setBlogPost(result);
      });
  }, []);

  const handleCreateBlog = async () => {
    try {
      console.log("blogheadline", blogheadline);
      console.log("blogtext", blogtext);
      console.log("image", image);

      // skapa formdata för media
      const mediaFormData = new FormData();
      mediaFormData.append("image", image);

      const mediaResponse = await fetch("http://localhost:3001/media", {
        method: "POST",
        body: mediaFormData,
      });

      if (!mediaResponse.ok) {
        throw new Error("failed to upload media");
      }

      const mediaData = await mediaResponse.json();
      const mediaId = mediaData.id; // anta att mediadata innehåller den uppladdade filen

      // skapa formdata för blogg
      const blogFormData = new FormData();
      blogFormData.append("blogheadline", blogheadline);
      blogFormData.append("blogtext", blogtext);
      blogFormData.append("mediaId", mediaId);

      // lägger in
      const blogResponse = await fetch(uploadURL, {
        method: "POST",
        body: blogFormData,
      });

      if (!blogResponse.ok) {
        throw new Error("failed to upload blog");
      }

      const data = await blogResponse.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating blog post", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting blog post", error);
    }
  };

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

            {post.file_path && (
              <img
                src={`http://localhost:3001/blog/${post.file_path}`}
                alt="uppladdad film eller bild som tillhör blogginlägget"
              ></img>
            )}
            <button
              style={{ marginRight: "5px" }}
              onClick={() => handleDelete(post.id)}
            >
              Radera
            </button>
            <button>Ändra</button>
          </li>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Create a new blog post</h1>
        <textarea
          placeholder="Rubrik"
          value={blogheadline}
          onChange={handleHeadline}
        ></textarea>
        <textarea
          placeholder="Skriv ditt blogginlägg här"
          value={blogtext}
          onChange={handleDescription}
          style={{ marginBottom: "10px", marginTop: "10px" }}
        ></textarea>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCreateBlog}>Posta inlägg</button>
      </div>
    </>
  );
}

export default BlogForm;

// try {
//   console.log("blogheadline", blogHeadline);
//   console.log("blogtext", blogText);
//   console.log("file", file);

//   const formData = new FormData();
//   formData.append("image", file);
//   formData.append("blogheadline", blogHeadline);
//   formData.append("blogtext", blogText);

//   const response = await fetch(uploadURL, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create blog post");
//   }
//   console.log(formData);

//   const data = await response.json();
//   console.log(data);
// } catch (error) {
//   console.error("Error creating blog post", error);
// }
