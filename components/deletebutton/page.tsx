'use client'
import { useRouter } from "next/navigation"


const page = ({postId}:{postId:string}) => {

const router = useRouter()
  const handleDelete = async () => {
    
    await fetch(`/api/posts/${postId}`,{
        method: 'DELETE'
    })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200"
      style={{
        cursor:'pointer'
      }}
    >
      Delete
    </button>
  )
}

export default page