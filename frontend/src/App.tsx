import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
