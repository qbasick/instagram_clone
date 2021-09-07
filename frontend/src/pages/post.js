import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";
import data from "../services/data-service";
import * as ROUTES from '../constants/routes';
import Header from "../components/header";
import BigPost from "../components/post-page/index";


export default function Post() {

    const {id} = useParams();
    const history = useHistory();
    const [postObj, setPostObj] = useState(null);

    useEffect(() => {
        data.getPost(id).then((res) => {
            if (res) {
                console.log(res);
                setPostObj(res);
            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        })
    }, [id]);

    return (
        <div>
            <Header/>
            <BigPost post={postObj}/>
        </div>
    );
}
