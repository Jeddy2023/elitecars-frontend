import { LuHome } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { useContext, useState } from 'react';
import ConfirmationModal from "../features/ConfirmationModal";
import { UserContext } from "../../hooks/userContext";
import { IoCarSportOutline } from "react-icons/io5";

const SideBarDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useContext(UserContext);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    close();
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} size={'xs'}>
        <menu className="px-6 pt-10">
          <ul className="flex flex-col gap-5 text-[#2a3547]">
            <h5 className="text-[15px] leading-[26px]">Menu</h5>
            <ul className="flex flex-col gap-5 font-medium">
              <Link to="/admin-dashboard"
                onClick={() => {
                  setSelected("dashboard");
                  close();
                }}
                className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "dashboard" ? "text-blue-500" : ""}`}
              >
                <LuHome size={15} />
                <p className="text-lg transition-scale ease-in duration-50 scale-90">Dashboard</p>
              </Link>
              <Link to="/admin-dashboard/users"
                onClick={() => {
                  setSelected("users")
                  close();
                }}
                className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "users" ? "text-blue-500" : "text-gray-600"}`}
              >
                <FiUsers size={15} />
                <p className="text-lg transition-scale ease-in duration-50 scale-90">Users</p>
              </Link>
              <Link to="/admin-dashboard/vehicles"
                onClick={() => {
                  setSelected("vehicles")
                  close();
                }}
                className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "vehicles" ? "text-blue-500" : "text-gray-600"}`}
              >
                <IoCarSportOutline size={15} />
                <p className="text-lg transition-scale ease-in duration-50 scale-90">Vehicles</p>
              </Link>
              <Link to="/admin-dashboard/bookings"
                onClick={() => {
                  setSelected("bookings")
                  close();
                }}
                className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "bookings" ? "text-blue-500" : "text-gray-600"}`}
              >
                <IoCarSportOutline size={15} />
                <p className="text-lg transition-scale ease-in duration-50 scale-90">Bookings</p>
              </Link>
            </ul>
            <h5 className="text-[15px] leading-[26px]">Elements</h5>
            <ul className="flex flex-col gap-5 font-medium">
              <li
                onClick={handleLogoutClick}
                className={`flex items-center align-middle gap-5 cursor-pointer hover:text-blue-500 ${selected === "logout" ? "text-blue-500" : ""}`}
              >
                <FaPowerOff size={15} />
                <p className="text-lg transition-scale ease-in duration-50 scale-90">Logout</p>
              </li>
            </ul>
          </ul>
        </menu>
      </Drawer>

      <RxHamburgerMenu
        size={20}
        className="sm:hidden block cursor-pointer"
        onClick={open}
      />

      <ConfirmationModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
      />
    </>
  );
}

export default SideBarDrawer;
