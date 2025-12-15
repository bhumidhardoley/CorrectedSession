'use client'

import { useRouter } from 'next/navigation'

export default function page() {
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
          display: 'flex',
          gap: '20px',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
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
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </button>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#10b981',
              color: '#ffffff',
            }}
            onClick={() => {
              router.push('/signin')
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
