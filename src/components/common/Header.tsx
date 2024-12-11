import { useContext, useState } from 'react';
import { ActionIcon, Button, Flex, Stack } from '@mantine/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoCloseSharp } from 'react-icons/io5';
import Logo from '../../assets/images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import ThemeSwitcher from './ThemeSwitcher';
import { UserContext } from '../../hooks/userContext';
import SignInModal from '../features/SignInModal';
import toast from 'react-hot-toast';

type Props = {};

const Header: React.FC<Props> = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { accessToken, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  const handleProfileClick = () => {
    if (!accessToken) {
      toast.error("Login to access this resource.")
      return;
    }

    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <nav className="auto-container center-margin custom-side-padding flex items-center justify-between bg-opacity-40 bg-[whitesmoke] dark:bg-[#0e0e0efc] transition-colors duration-300 ease-in-out">
      <Link to="/" className="flex items-center w-36 h-20">
        <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-grow items-center justify-center gap-6">
        <Link to="/" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>Home</h2>
        </Link>
        <Link to="/car-listing" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>Car Listing</h2>
        </Link>
        {/* <Link to="/contact" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
          <h2>Contact</h2>
        </Link> */}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeSwitcher />
        <Link to="/admin-dashboard">
          <IoPersonOutline size={25} className="text-gray-800 dark:text-gray-200" />
        </Link>
        <ActionIcon onClick={() => setOpenSidebar(!openSidebar)} bg='transparent' className='z-[100000]'>
          {openSidebar ? <IoCloseSharp size={25} className="text-gray-800 dark:text-gray-200" /> : <HiMenuAlt3 size={25} className="text-gray-800 dark:text-gray-200" />}
        </ActionIcon>
      </div>

      <Flex align="center" gap={5} className="hidden md:flex">
        {!accessToken && <Flex gap={5}>
          <Link to="/register">
            <Button color={'#ff992e'} className="hover:bg-bg-general dark:hover:bg-bg-general-dark transition duration-300">
              Sign up
            </Button>
          </Link>
          <SignInModal />
        </Flex>}
        {/* <ActionIcon bg='transparent' className="">
          <ThemeSwitcher />
        </ActionIcon> */}
        {/* <ActionIcon bg='transparent' className="relative cursor-pointer overflow-visible">
          <GoBell size={25} className="text-gray-800 dark:text-gray-200" />
          <span className="absolute top-[-11px] right-[-7px] bg-bg-general dark:bg-bg-general-dark rounded-full text-white text-xs font-semibold w-5 h-5 flex items-center justify-center">0</span>
        </ActionIcon> */}
        <ActionIcon onClick={handleProfileClick} bg="transparent">
          <IoPersonOutline size={25} className="text-gray-800 dark:text-gray-200" />
        </ActionIcon>
      </Flex>

      {/* Responsive Drawer */}

      {
        openSidebar && (
          <div className="fixed w-[50%] h-screen top-0 right-0 z-[100] bg-[whitesmoke] dark:bg-[#0e0e0ef6] pt-16 pl-[7%]" onClick={handleClose} id='screen'>
            <Stack gap="md" className='relative'>
              <Link to="/" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>Home</h2>
              </Link>
              <Link to="/car-listing" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>Car Listing</h2>
              </Link>
              {/* <Link to="/contact" className="font-medium text-gray-800 dark:text-gray-200 hover:text-bg-general dark:hover:text-gray-400 transition duration-300">
                <h2>Contact</h2>
              </Link> */}
              {!accessToken && <>
                <Link to="/register">
                  <Button color={'#ff992e'}>Sign up</Button>
                </Link>
                <div>
                  <SignInModal />
                </div>
              </>}
            </Stack>
          </div>
        )
      }
    </nav>
  );
};

export default Header;
