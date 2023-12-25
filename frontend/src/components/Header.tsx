import { User } from "lucide-react";
import { useAppDispatch } from "../store";
import { authActions } from "../store/slices/auth";

export function Header() {
  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(authActions.logOut())
  }

  return (
    <header className="flex items-center justify-end h-16 gap-4 bg-secondary/25 text-white px-6 fixed top-0 right-0 w-full">

      <button className="text-red-500 text-sm" onClick={handleLogout}>sign out</button>
      <span
        className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-secondary"
        id="radix-:rc:"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          <User />
        </span>
      </span>
    </header>
  )
}