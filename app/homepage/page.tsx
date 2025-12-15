'use client'
import LogOutButton from "@/components/button/page"
import { useRouter } from "next/navigation"

const page = () => {

    const router = useRouter()
  return (
    <div style={{
      textAlign:'center'
    }}>
      <h1>You Are in the HomePage</h1>
      <LogOutButton/>
      <button style={{
        padding: '10px',
        margin:'10px',
        border: '1px solid black',
        borderRadius: '10px',
        cursor: 'pointer'
      }}
      
      onClick={()=>router.push('/createpost')}
      >Create Post</button>
      </div>
    
  )
}

export default page