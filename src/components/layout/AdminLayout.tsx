import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/Sidebar';
import Header from '../admin/Header';

function AdminLayout() {
  return (
    <div className="custom-font-jakarta dashboard flex bg-[rgb(248, 248, 248)] max-w-[1700px] m-0 mx-auto">
      <div className="max-w-[200px] bg-white ease-in-out duration-300 border border-l-4">
        <Sidebar />
      </div>
      <div className="w-full overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout;