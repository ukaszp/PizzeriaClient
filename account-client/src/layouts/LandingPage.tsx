import { LandingPageSideNav } from "@/components/LandingPage/landingPageSideNav";
import NewOrder from "@/components/LandingPage/newOrder";
import AdminMain from "@/components/ui/AdminPanel/adminMain";
import { AdminSideNav } from "@/components/ui/AdminPanel/adminSideNav";
import AdminUsers from "@/components/ui/AdminPanel/adminUsers";
import UserEdit from "@/components/ui/AdminPanel/userEdit";
import UserInfo from "@/components/ui/AdminPanel/userInfo";
import useAuthStore from "@/scripts/authLoginStore";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const LandingPage = () => {
    const user = useAuthStore((state) => state.user);

    return (

    <div className="flex gap-1">
        <div className="left-0">
            <LandingPageSideNav/>
        </div>
        <div>
            <Routes>
                <Route path="/" element={<NewOrder/>}/>
                <Route path="/neworder" element={<NewOrder/>}/>
                <Route path="/users/profile/:id" element={<UserInfo/>}/>
                <Route path="/users/profile/edit/:id" element={<UserEdit/>}/>
            </Routes>
        </div>
    </div>

    )
}

export default LandingPage;