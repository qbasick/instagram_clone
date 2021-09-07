import { useEffect } from 'react';
import "../styles/not-found.css";
export default function NotFound() {
    useEffect(() => {document.title = 'Not found'}, []);
    return (
        <div className="not-found">
            <p>404! Not found!</p>
        </div>
    )
}
