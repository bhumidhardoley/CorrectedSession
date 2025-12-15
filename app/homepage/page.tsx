"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogOutButton from "@/components/button/page";

interface Post {
  _id: string;
  title: string;
  createdAt: string;
}

const Page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts/self");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>You are in the HomePage</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <LogOutButton />
        <button
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid black",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/createpost")}
        >
          Create Post
        </button>
      </div>

      <hr />

      <h2>Your Posts</h2>

      {loading && <p>Loading...</p>}

      {!loading && posts.length === 0 && (
        <p>No posts yet.</p>
      )}

      <ul style={{ marginTop: "15px", paddingLeft: "18px" }}>
        {posts.map((post) => (
          <li key={post._id} style={{ marginBottom: "8px" }}>
            <Link
              href={`/posts/${post._id}`}
              style={{
                textDecoration: "none",
                color: "#111",
                fontWeight: 500,
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
