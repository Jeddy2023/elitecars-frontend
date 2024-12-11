import { Avatar } from "@mantine/core";
import UserAvatar from '../../assets/images/userprofileimage.jpg';
import SideBarDrawer from "./SideBarDrawer";

const Header = () => {
  return (
    <header className="min-h-20 border-b sm:pl-10 pl-5 w-full flex justify-between">
      <div className="flex gap-5 items-center">
        <SideBarDrawer />
        <h2 className="font-semibold text-lg">Header Admin</h2>
      </div>
      <div className="flex items-center gap-2 bg-gray-50 p-3 border">
        <Avatar src={UserAvatar} size={35} />
        <p className="text-sm sm:block hidden">Administrator</p>
      </div>
    </header>
  );
}

export default Header;