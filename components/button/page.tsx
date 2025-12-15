'use client'
import { useRouter } from 'next/navigation'

const page = () => {

    const handleLogout = async ()=>{

        
       try{
         const response = await fetch("/api/logout",{
            method:'POST', 
            headers: {
                'Content-Type':'application/json'
            }


        })
            if(response.ok){
                router.push('/')
            } else {
                console.error('logout failed on server')
            }
       } catch(error){
        console.error('An error occurred duing logout',error)
       }
    }
    const router = useRouter()
  return (
     <div
      style={{
        minHeight: '60vh',
        minWidth:'100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
      }}
    >
      



        <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#0070f3',
              color: '#ffffff',
            }}

            onClick={handleLogout}
          >
            Log out
          </button>
    </div>
  )
}

export default page
