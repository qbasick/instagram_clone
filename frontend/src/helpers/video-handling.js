import {IMAGE_SRC} from "../constants/endpoints";

export function isVideoRef(ref) {
    console.log(ref);
    const pos = ref.lastIndexOf(".");
    const extension = ref.substring(pos + 1);
    console.log(extension);
    return ["mp4", "webm", "ogg"].some((w) => w === extension);
}

export function createSnapshotFromVideo(callback, reference, timeCode= 0.0, serverPrefix= IMAGE_SRC + "videos/") {
    return new Promise(() => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', serverPrefix + reference);
        videoPlayer.load();
        videoPlayer.crossOrigin = "anonymous";
        videoPlayer.addEventListener('error', (ex) => {
            callback("/images/logo.png");
        });

        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < timeCode) {
                callback("/images/logo.png")
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
                videoPlayer.currentTime = timeCode;
            }, 0);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                let url = ctx.canvas.toDataURL("image/png", 1);
                callback(url);
            });
        });
    });
}
