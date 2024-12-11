import { Avatar, Drawer } from '@mantine/core';
import { FiMenu } from 'react-icons/fi';
import UserAvatar from '../../assets/images/userprofileimage.jpg';
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { UserContext } from '../../hooks/userContext';
import ConfirmationModal from '../features/ConfirmationModal';  
import { Link } from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiUserAddLine } from 'react-icons/ri';
import { TbBuildingBank, TbHomeStats } from 'react-icons/tb';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';

interface UserHeaderProps {
    setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserHeader: React.FC<UserHeaderProps> = ({ setIsSidebarExpanded }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [drawerOpened, setDrawerOpened] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 640px)');
    const [active, setActive] = useState(location.pathname);
    const { logout } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSetActive = (path: string) => {
        setActive(path);
    };

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        logout();
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleSidebarOrDrawer = () => {
        if (isSmallScreen) {
            setDrawerOpened((prev) => !prev);
        } else {
            setIsSidebarExpanded((prev) => !prev);
        }
    };

    return (
        <div className={`${isScrolled ? 'w-[97%] my-3 shadow-lg' : 'w-full'} transition-all ease-in-out duration-300 rounded-lg`}>
            <div className='flex justify-between items-center py-3 px-[2%] gap-5'>
                <div
                    className='p-2 hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-full cursor-pointer'
                    onClick={toggleSidebarOrDrawer}
                >
                    <FiMenu size={20} />
                </div>
                <div className='flex gap-3 items-center relative'>
                    <div className="gtranslate_wrapper" id="gtranslate_wrapper"></div>
                    <Avatar src={UserAvatar} />
                </div>
            </div>
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                padding="xl"
                size="sm"
            >
                <menu className='mt-[10px]'>
                    <ul>
                        <li className='text-[1rem]'>
                            <h5 className='text-[#2a3547] mt-[24px] px-[8px] font-bold text-[13px] leading-[26px]'>HOME</h5>
                            <Link to="/dashboard" className={`flex gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg ${active === '/dashboard' ? 'bg-[#306ee8] text-white' : ''}`} onClick={() => handleSetActive('/dashboard')}>
                                <LuLayoutDashboard size={20} />
                                <span className='ease-in-out duration-300'>Overview</span>
                            </Link>
                            <Link to="/dashboard/profile" className={`flex gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg ${active === '/dashboard/profile' ? 'bg-[#306ee8] text-white' : ''}`} onClick={() => handleSetActive('/dashboard/profile')}>
                                <RiUserAddLine size={20} />
                                <span className='ease-in-out duration-300'>My Profile</span>
                            </Link>
                        </li>

                        <li className='text-[1rem]'>
                            <h5 className='text-[#2a3547] mt-[24px] px-[8px] font-bold text-[13px] leading-[26px]'>APPS</h5>
                            <Link to="/dashboard/investments" className={`flex gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg ${active === '/dashboard/investments' ? 'bg-[#306ee8] text-white' : ''}`} onClick={() => handleSetActive('/dashboard/investments')}>
                                <TbHomeStats size={20} />
                                <span className='ease-in-out duration-300'>Investments</span>
                            </Link>
                            <Link to="/dashboard/transaction" className={`flex gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg ${active === '/dashboard/transaction' ? 'bg-[#306ee8] text-white' : ''}`} onClick={() => handleSetActive('/dashboard/transaction')}>
                                <TbBuildingBank size={20} />
                                <span className='ease-in-out duration-300'>Transactions</span>
                            </Link>
                        </li>

                        <li className='text-[1rem]'>
                            <h5 className='text-[#2a3547] mt-[24px] px-[8px] font-bold text-[13px] leading-[26px]'>EXTRAS</h5>
                            <button className={`flex w-full gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg`} onClick={handleLogoutClick}>
                                <MdOutlinePowerSettingsNew size={20} />
                                <span className='ease-in-out duration-300'>Log Out</span>
                            </button>
                        </li>
                    </ul>
                </menu>
            </Drawer>
            <ConfirmationModal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
            />
        </div>
    );
};

export default UserHeader;
