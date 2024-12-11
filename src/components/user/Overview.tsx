import UserProfileCard from "../features/UserProfileCard";
import BookingManagement from "./BookingManagement";

function Overview() {

    return (
        <div className='pb-32'>
            <div>
                <UserProfileCard />
            </div>
            <BookingManagement/>
        </div>
    )
}

export default Overview;
