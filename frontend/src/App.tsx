import "./styles/global.css"

import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./store";

import { router } from './routes'

export function App() {
  return (
    <ReduxProvider store={store}>
      <Toaster richColors />

      <RouterProvider router={router} />
    </ReduxProvider>
  )
}