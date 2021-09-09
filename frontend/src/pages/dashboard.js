import {useEffect} from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar/index";
import "../styles/dashboard.css";

export default function Dashboard() {


    useEffect(() => {
        document.title = 'Instagram';
        }, []);


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
