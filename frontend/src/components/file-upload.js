import {useEffect, useState} from "react";
import data from "../services/data-service";
import {useHistory} from "react-router-dom";
import "../styles/file-upload.css";
import {createSnapshotFromVideo, isVideoRef} from "../helpers/video-handling";

export default function FileUpload({active,setActive}) {

    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [preview, setPreview] = useState(null);

    const history = useHistory();

    useEffect(() => {
        setCaption("");
        setFile(null);
        setPreview(null);
    }, [active]);

    const createPost = () => {
        if (file && caption) {
            data.createPost(file, caption).then((res) => {
                if (res) {
                    history.push("/p/" + res.id);
                    setActive(false);
                }
            });
        }
    }

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
        let src = URL.createObjectURL(event.target.files[0]);

        if (isVideoRef(event.target.files[0].name)) {
            createSnapshotFromVideo(setPreview, src, 0.0, "");
        } else {
            setPreview(src);
        }
    }

    const handleDrop = (event) => {
        setFile(event.dataTransfer.files[0]);
        let src = URL.createObjectURL(event.dataTransfer.files[0]);
        if (isVideoRef(event.dataTransfer.files[0].name)) {
            createSnapshotFromVideo(setPreview, src, 0.0, "");
        } else {
            setPreview(src);
        }
    }

    return (
        <div className="file-upload-container"
             onDrop={(e) => {
                 console.log("DROPPED")
                 e.stopPropagation();
                 e.preventDefault();
                 handleDrop(e);
             }}
             onDragEnter={(e) => {e.stopPropagation(); e.preventDefault()}}
             onDragOver={(e) => {e.stopPropagation(); e.preventDefault()}}>
            <div className="file-upload-header">
                <p>NEW POST</p>
            </div>

            <div className="file-upload-caption-field-container">
            <textarea
                className="file-upload-caption-field"
                aria-label="Add a caption"
                autoComplete="off"
                //type="text"
                placeholder="Add a caption..."
                value={caption}
                onChange={({target}) => setCaption(target.value)}
            />
            </div>
            <div className="file-upload-image-preview">
                <p>{file ? `File name: ${file.name}` : "Drag and drop here"}</p>
                <label className="file-upload-select-button">
                    Select file
                    <input type="file" accept="image/*" onChange={handleFileSelect}/>
                </label>
                <img src={preview}/>
            </div>
            <div className="file-upload-submit-button-container">
            <button
                className="file-upload-submit-button"
                type="button"
                onClick={createPost}
                disabled={caption.length === 0 && !file}
            >
                Submit
            </button>
            </div>
        </div>
    )
}
