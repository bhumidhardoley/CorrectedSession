
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
}

const PostPage = () => {
  const { _id } = useParams<{ _id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${_id}`);
        if (!res.ok) {
          router.push("/");
          return;
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [_id, router]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!post) return null;

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "20px",
          background: "none",
          border: "none",
          color: "#555",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h1 style={{ marginBottom: "10px" }}>{post.title}</h1>

      <small style={{ color: "#777" }}>
        {new Date(post.createdAt).toLocaleDateString()}
      </small>

      <hr style={{ margin: "20px 0" }} />

      <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
        {post.body}
      </p>
    </main>
  );
};

export default PostPage;
