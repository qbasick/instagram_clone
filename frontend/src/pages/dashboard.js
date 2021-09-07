import {useContext, useEffect} from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar/index";
import "../styles/dashboard.css";
import UserContext from "../context/user";
import {useHistory} from "react-router-dom";

export default function Dashboard() {

    const {userDetails} = useContext(UserContext);


    useEffect(() => {
        document.title = 'Instagram';
        }, [userDetails]);


    return (
        <div>
            <Header/>
            <div className="grid-container">
                <Timeline/>
                <Sidebar/>
            </div>
        </div>
    )
}
