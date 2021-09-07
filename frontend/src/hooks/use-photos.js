import data from "../services/data-service";
import {useEffect, useState} from "react";


export default function usePhotos(user) {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [damper, setDamper] = useState(true);

    useEffect(() => {
        if (user) {
            data.loadUserTimeline(user, currentPage)
                .then((result) => {
                    if (result.length > 0) {
                        setPhotos((photos) => [...new Map([...photos, ...result]
                            .map((photo) => [photo.id, photo])).values()]
                        );
                        setCurrentPage((currentPage) => currentPage + 1);
                    }
                });
        }
    }, [user]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    useEffect(() => {
        if (fetching && damper) {
            setDamper(false);
            setTimeout(() => {
                setDamper(true);
                setFetching(false);
                console.log("from timeout");
            }, 1500);
            data.loadUserTimeline(user, currentPage)
                .then((result) => {
                    if (result.length > 0) {
                        setPhotos((photos) => [...photos, ...result]);
                        setCurrentPage((currentPage) => currentPage + 1);
                    }
                });
        }
    }, [fetching]);


    const scrollHandler = (event) => {
        let curPos = event.target.documentElement.scrollTop;
        let totalHeight = event.target.documentElement.scrollHeight;
        let displayedHeight = window.innerHeight;
        if (totalHeight - (curPos + displayedHeight) < 100) {
            setFetching(true);
        }
    }


    return {photos};
}
