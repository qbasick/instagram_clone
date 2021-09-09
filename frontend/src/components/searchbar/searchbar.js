import {useRef, useState} from "react";
import "../../styles/searchbar.css";
import data from "../../services/data-service";
import FollowProfile from "../profile-page/follow-profile";
import SearchBarProfile from "./searchbar-profile";


export default function SearchBar() {

    const [text, setText] = useState("");
    const [activations, setActivations] = useState(0);
    const [profiles, setProfiles] = useState([]);

    const st = useRef(0);

    const search = (text) => {
        setText(text);
        setActivations((activations) => activations + 1);
        setTimeout(function() {
            if (st.current - activations === 0 && text.length > 0) {
                data.searchByFragment(text).then((res) => {
                if (res && res.length > 0) {
                    setProfiles([...res]);
                } else {
                    setProfiles([]);
                }
            });
            } else {
                setProfiles([]);
            }
        }, 500);
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar-input">
                <input
                    value={text}
                    onChange={(e) => {
                        st.current = activations;
                        search(e.target.value);
                    }}
                    type="search"
                />
            </div>
            <div className="absolute-searchbar-profiles"
                onClick={event => {
                    setText("");
                    setProfiles([]);
                }}>
                {profiles.length > 0
                    ?
                    <div className="stacking-context-for-searchbar">
                        <div className="searchbar-profiles">
                            {profiles.map(profile =>
                                <SearchBarProfile
                                    key={profile.username}
                                    username={profile.username}
                                    description={profile.description}
                                    photo={profile.photo}/>
                            )}
                        </div>

                    </div>
                    : null}
            </div>
        </div>

    )
}
