import User from "./user";
import Suggestions from "./suggestions";
import "../../styles/sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <User/>
            <Suggestions/>
        </div>
    );
}
