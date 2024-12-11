import { useContext, } from 'react';
import { Avatar } from '@mantine/core';
import Background from '../../assets/images/userwelcome-bg.svg';
import UserAvatar from '../../assets/images/userprofileimage.jpg';  
import { UserContext } from '../../hooks/userContext';

interface UserProfileCardProps {}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ }) => {
    const { user } = useContext(UserContext);

    return (
        <div className='auto-container flex flex-col md:flex-row md:justify-between md:items-center gap-5 py-2 px-4'>
            <div className='flex flex-col gap-3 my-4 md:my-0'>
                <div className='flex gap-3 items-center'>
                    <div className='relative border-2 border-[#5D87FF] rounded-full'>
                        <Avatar src={UserAvatar} size={75} />
                    </div>
                    <div>
                        <h3 className='text-[1.53rem] font-semibold'>Hi, <span>{user?.full_name}</span></h3>
                        <span className='text-[#5a6a85] text-[14px]'>Here's a summary of your account. Have fun! </span>
                    </div>
                </div>
            </div>
            <img src={Background} alt="Background" className='hidden md:block max-h-[300px] object-contain' />
        </div >
    );
}

export default UserProfileCard;
