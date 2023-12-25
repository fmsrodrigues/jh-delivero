import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../store'

export function AuthLayout() {
  const isLoggedIn = useAppSelector(state => !!state.auth.token)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex min-h-screen antialiased">
      <div className="w-1/2 h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Person delivering packages"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-background text-text">
        <Outlet />
      </div>
    </div>
  )
}