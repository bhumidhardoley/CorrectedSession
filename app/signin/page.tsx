'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"


const page = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');


  async function handleSignIn(e: React.FormEvent<HTMLFormElement>){

    e.preventDefault()

    const response = await fetch('/api/signin',{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username,password})
    })
const data: {message: string} = await response.json();
 if (!response.ok) {
    alert(data.message); // show error
    return;
  }
router.replace('/homepage')

  }

  const router = useRouter()
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '24px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
       <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  }}
>
  <img
    src="/arrowleft.svg"
    alt="Back"
    style={{
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    }}
    onClick={() => router.back()}
  />

  <h1 style={{ margin: 0, flex: 1, textAlign: 'center' }}>
    Sign In
  </h1>
</div>

        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="username"
              style={{ display: 'block', marginBottom: '6px' }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Username"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                outline: 'none',
              }}
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="password"
              style={{ display: 'block', marginBottom: '6px' }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                outline: 'none',
              }}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0070f3',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
