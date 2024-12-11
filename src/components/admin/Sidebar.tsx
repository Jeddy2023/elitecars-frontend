import { LuChrome } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa";
import { UserContext } from "../../hooks/userContext";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ConfirmationModal from "../features/ConfirmationModal";
import { IoCarSportOutline } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";


const Sidebar = () => {
  const [open, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, SetSelected] = useState("dashboard");
  const { logout } = useContext(UserContext);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
  };

  return (
    <div
      className={`relative min-h-screen transition-all ease-in duration-200 z-50 bg-gray-[#e9e9ef] hidden sm:block ${open ? "w-[200px]" : "w-[80px]"}`}
    >
      {open && (<div className="px-5 pt-7 pb-10 text-center flex items-center align-middle gap-3 text-[#2a3547] font-semibold">
        <h1 className="font-bold text-xl">Admin</h1>
      </div>)}

      {/* toggle sidebar open and close */}
      <button
        className="sm:block hidden absolute right-[-16px] top-5 rounded-full bg-blue-500 p-2 text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {open ? <FaAngleLeft size={23} /> : <FaAngleRight size={23} />}
      </button>

      <menu className={`px-6 ${!open ? "pt-32" : ""}`}>
        <ul className="flex flex-col gap-5 text-[#2a3547]">
          {open && (<h5 className="text-[15px] leading-[26px]">
            Menu
          </h5>)}
          <ul className="flex flex-col gap-5 font-medium">
            <Link to="/admin-dashboard"
              onClick={() => SetSelected("dashboard")}
              className={`flex items-center font-semibold align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "dashboard" ? "text-blue-500" : "text-gray-600"}`}
            >
              <LuChrome size={open ? 18 : 21} />
              {open && <p className={`text-md ${open ? "transition-scale ease-in duration-50 scale-90" : ""}`}>Dashboard</p>}
            </Link>
            <Link to="/admin-dashboard/users"
              onClick={() => SetSelected("users")}
              className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "users" ? "text-blue-500" : "text-gray-600"}`}
            >
              <FiUsers size={open ? 18 : 21} />
              {open && <p className={`text-md  font-semibold ${open ? "transition-scale ease-in duration-50 scale-90" : ""}`}>Users</p>}
            </Link>
            <Link to="/admin-dashboard/vehicles"
              onClick={() => SetSelected("vehicles")}
              className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "vehicles" ? "text-blue-500" : "text-gray-600"}`}
            >
              <IoCarSportOutline size={open ? 18 : 21} />
              {open && <p className={`text-md  font-semibold ${open ? "transition-scale ease-in duration-50 scale-90" : ""}`}>Vehicles</p>}
            </Link>
            <Link to="/admin-dashboard/bookings"
              onClick={() => SetSelected("bookings")}
              className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "bookings" ? "text-blue-500" : "text-gray-600"}`}
            >
              <TbBrandBooking size={open ? 18 : 21} />
              {open && <p className={`text-md  font-semibold ${open ? "transition-scale ease-in duration-50 scale-90" : ""}`}>Bookings</p>}
            </Link>
          </ul>
          {open && (<h5 className="text-[15px] leading-[26px]">
            Elements
          </h5>)}
          <ul className="flex flex-col gap-5 font-medium">
            <li
              onClick={handleLogoutClick}
              className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "logout" ? "text-blue-500" : "text-gray-600"}`}
            >
              <FaPowerOff size={open ? 18 : 21} />
              {open && <p className={`text-md font-semibold ${open ? "transition-scale ease-in duration-50 scale-90" : ""}`}>Logout</p>}
            </li>
          </ul>
        </ul>
      </menu>
      <ConfirmationModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
      />
    </div>
  );
}

export default Sidebar;
