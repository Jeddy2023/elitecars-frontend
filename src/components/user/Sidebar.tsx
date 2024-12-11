import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { useContext, useState } from 'react';
import { UserContext } from '../../hooks/userContext';
import ConfirmationModal from '../features/ConfirmationModal';

interface SidebarProps {
    isSidebarExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarExpanded }) => {
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [active, setActive] = useState(location.pathname);
    const { logout } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSetActive = (path: string) => {
        setActive(path);
    };

    const handleMouseEnter = () => {
        if (!isSidebarExpanded) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isSidebarExpanded) {
            setIsHovered(false);
        }
    };

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        logout();
    };

    return (
        <div className={`relative py-[10px] px-[20px] transition-all ease-in duration-200 z-50 bg-gray-[#e9e9ef] hidden sm:block ${isSidebarExpanded || isHovered ? "w-[255px]" : "w-[80px]"}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>    
            <menu className='mt-[10px]'>
                <ul>
                    <li className='text-[1rem]'>
                        <h5 className='text-[#2a3547] mt-[24px] px-[8px] font-bold text-[13px] leading-[26px]'>{isSidebarExpanded || isHovered ? 'HOME' : '...'}</h5>
                        <Link to="/user-dashboard" className={`flex ${(isSidebarExpanded || isHovered) ? '' : 'justify-center items-center'} gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg ${active === '/dashboard' ? 'bg-[#306ee8] text-white' : ''}`} onClick={() => handleSetActive('/dashboard')}>
                            <LuLayoutDashboard size={20} />
                            {(isSidebarExpanded || isHovered) && <span className='ease-in-out duration-300'>Overview</span>}
                        </Link>
                        <Link to="/user-dashboard/profile" className={`flex ${(isSidebarExpanded || isHovered) ? '' : 'justify-center items-center'} gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg ${active === '/dashboard/profile' ? 'bg-[#306ee8] text-white' : ''}`} onClick={() => handleSetActive('/dashboard/profile')}>
                            <RiUserAddLine size={20} />
                            {(isSidebarExpanded || isHovered) && <span className='ease-in-out duration-300'>My Profile</span>}
                        </Link>
                    </li>
                    <li className='text-[1rem]'>
                        <h5 className='text-[#2a3547] mt-[24px] px-[8px] font-bold text-[13px] leading-[26px]'>{isSidebarExpanded || isHovered ? 'EXTRAS' : '...'}</h5>
                        <button className={`flex w-full ${(isSidebarExpanded || isHovered) ? '' : 'justify-center items-center'} gap-[10px] font-medium text-[#2a3547] text-[14px] py-[10px] px-[8px] hover:bg-[#3399ff1a] hover:text-[#306ee8] rounded-lg`} onClick={handleLogoutClick}>
                            <MdOutlinePowerSettingsNew size={20} />
                            {(isSidebarExpanded || isHovered) && <span className='ease-in-out duration-300'>Log Out</span>}
                        </button>
                    </li>
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
};

export default Sidebar;