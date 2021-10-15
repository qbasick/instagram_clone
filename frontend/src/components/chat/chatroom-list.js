import data from "../../services/data-service";
import {useEffect, useContext, useState} from "react";
import UserContext from "../../context/user";



export default function ChatroomList() {

    const [rooms, setRooms] = useState([]);
    const {userDetails} = useContext(UserContext);

    useEffect(() => {
        if (userDetails) {
            data.loadChatRooms().then(res => {
                if (res) {
                    setRooms(res);
                }
            })
        }
    }, [userDetails]);


    return (
      <div className="chatrooms-module">
          <div className="chatrooms-header">

          </div>
          <div className="chatrooms-list-container">
              {rooms.map(room =>
                  <div>

                  </div>
              )}
          </div>
      </div>
    );
}
