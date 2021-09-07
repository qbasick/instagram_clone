import {IMAGE_SRC} from "../constants/endpoints";
//TODO
export default function VideoPlayer({filename}) {
    return (
        <video src={IMAGE_SRC + "videos/" + filename}/>
    )

}
