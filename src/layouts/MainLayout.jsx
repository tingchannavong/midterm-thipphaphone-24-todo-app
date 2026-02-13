
import { Outlet } from "react-router"
function MainLayout() {
  return (
    <div className="bg-[#101628] w-screen h-screen">
        <h1 className="text-purple-200 text-center text-3xl p-2 uppercase font-mono tracking-tighter">To Do App</h1>
        <div className="container">
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout