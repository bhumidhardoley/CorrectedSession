"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/createpost",{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({title,body})
    })
  
   if(response.ok){
    router.push('/homepage')
   } else {
    alert('Something went Wrong')
   }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex justify-center">
      <div className="w-full max-w-3xl px-6 py-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Create new post
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Share your thoughts with the community
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Content
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post here..."
              rows={8}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-md px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              style={{
                cursor: 'pointer'
              }}
              onClick={handleSubmit}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
