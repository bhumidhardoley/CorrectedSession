"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  body: string;
  date: string;
}

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) return <p style={{
    textAlign: 'center'
  }}>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{
        fontWeight: 'bold',
fontSize: '1.5rem'
      }}>{post.title}</h1>
      <hr />
      <p style={{ marginTop: "15px", lineHeight: 1.6 }}>{post.body}</p>
     <button
  style={{
    position: "fixed",
    right: "20px",
    bottom: "20px", // stays visible while scrolling
    padding: "10px 16px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "1px solid #111827",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
    zIndex: 1000, // ensures it stays above content
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#1f2937";
    e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#111827";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
  }}
>
  Edit Post
</button>

    </div>
  );
};

export default PostPage;
