import { Navigate, Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { useAppSelector } from '../../store'

export function AppLayout() {
  const isLoggedIn = useAppSelector(state => !!state.auth.token)

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen flex-col antialiased h-[100vh] overflow-hidden">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6 bg-background text-text ">
        <Outlet />
      </div>
    </div>
  )
}