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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{
        fontWeight: 'bold',
fontSize: '1.5rem'
      }}>{post.title}</h1>
      <p style={{ marginTop: "15px", lineHeight: 1.6 }}>{post.body}</p>
    </div>
  );
};

export default PostPage;
