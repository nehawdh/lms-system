import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
