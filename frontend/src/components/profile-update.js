import {useEffect, useState} from "react";
import data from "../services/data-service";
import {useHistory} from "react-router-dom";
import "../styles/file-upload.css";

export default function ProfileUpdate({active,setActive}) {

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
        data.updateProfile(file, caption).then((res) => {
            if (res) {
                history.go(0);
                setActive(false);
            }
        });
    }

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
        let src = URL.createObjectURL(event.target.files[0]);
        console.log(event.target.files);
        console.log(src);
        setPreview(src);
    }

    const handleDrop = (event) => {
        console.log(event.dataTransfer.files[0]);
        setFile(event.dataTransfer.files[0]);
        let src = URL.createObjectURL(event.dataTransfer.files[0]);

        console.log(src);
        setPreview(src);
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
                <p>UPDATE PROFILE</p>
            </div>

            <div className="file-upload-caption-field-container">
            <textarea
                className="file-upload-caption-field"
                aria-label="New description"
                autoComplete="off"
                //type="text"
                placeholder="New description"
                value={caption}
                onChange={({target}) => setCaption(target.value)}
            />
            </div>
            <div className="file-upload-image-preview">
                <p>{file ? `File name: ${file.name}` : "Drag and drop new photo here"}</p>
                <label className="file-upload-select-button">
                    Select file
                    <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileSelect}/>
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
