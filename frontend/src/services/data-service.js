import authHeader from "./auth-header";

const USER_API = "http://localhost:8080/api/users";
const POST_API = "http://localhost:8080/api/posts";
const COMMENT_API = "http://localhost:8080/api/comments";
const FILE_API = "http://localhost:8080/api/files";

const enhancedFetch = (url, method, args) => {
    if (!args) {
        args = {};
    }
    args.headers = {...args.headers, ...authHeader()};
    args.method = method.toUpperCase();
    return fetch(url, args);
};

const createPost = async (file, caption) => {
    let formData = new FormData();
    formData.append("file", file);

    let uploadResponse = await enhancedFetch(FILE_API + "/upload", "post", {
        //headers: {'Content-Type': 'multipart/form-data'},
        body: formData});
    let photo = uploadResponse.ok && await uploadResponse.text();

    if (photo) {
        let createPostResponse = await enhancedFetch(POST_API + "/create", "post", {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({photo, caption})});
        return createPostResponse.ok && await createPostResponse.json();
    } else {
        return false;
    }
}

const updateProfile = async (file, description) => {
    console.log(file, description);
    let photo = null;
    if (file) {
        let formData = new FormData();
        formData.append("file", file);

        let uploadResponse = await enhancedFetch(FILE_API + "/upload", "post", {
            //headers: {'Content-Type': 'multipart/form-data'},
            body: formData
        });
        photo = uploadResponse.ok && await uploadResponse.text();
    }
    let updateProfileResponse = await enhancedFetch(USER_API + "/update", "patch", {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({photo, description})});
    return updateProfileResponse.ok;
}

const searchByFragment = async (fragment) => {
    let response = await enhancedFetch(USER_API + `/find?fragment=${fragment}`, "get");
    return response.ok && await response.json();
}

const toggleFollow = async (username) => {
    let response = await enhancedFetch(USER_API + "/follow" + username, "post");
    return !!response.status;
}

const getFollowers = async (username) => {
    let response = await enhancedFetch(USER_API + "/follow/followers/" + username, "get");
    return response.ok && await response.json();
}

const getFollowing = async (username) => {
    let response = await enhancedFetch(USER_API + "/follow/following/" + username, "get");
    return response.ok && await response.json();
}
// Placeholder. Should be implemented as backend function
const isUserFollowedByMe = async (username, me) => {
    let response = await getFollowers(username);
    if (response) {
        return response.some((user) => user.username === me.username);
    } else {
        return false;
    }
}

const getPost = async (id) => {
    let response = await enhancedFetch(POST_API + "/" + id, "get");
    return response.ok && await response.json();
}

const loadUserPosts = async (username, page) => {
    let response = await enhancedFetch(POST_API + "/u/" + username + "?page=" + page, "get");
    return Object.values(await response.json());
}

const toggleLike = async (id) => {
    let response = await enhancedFetch(POST_API + "/like", "post", {headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})});
    return response.ok;
}

const getPostCount = async (username) => {
    let response = await enhancedFetch(POST_API + "/u/" + username + "/postcount", "get");
    return response.ok && await response.text();
}

const likeCount = async (id) => {
    let response = await enhancedFetch(POST_API + "/" + id + "/likes", "get");
    return await response.text();
}

const postComment = async (postId, text) => {
    let body = {postId, text};
    let response = await enhancedFetch(COMMENT_API + "/create",
        "post",
        {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)})
    return response.ok && await response.text();
}

const loadCommentsToPost = async (postId, page) => {
    let response = await enhancedFetch(COMMENT_API + "/by-post/" + postId + "?page=" + page, "get");
    return await response.json();
}

const getUser = async (username) => {
    let response = await enhancedFetch(USER_API + "/" + username, "get");
    return response.ok && await response.json();
}

const getSuggestions = async () => {
    let response = await enhancedFetch(USER_API + "/recommend", "get");
    return response.ok && await response.json();
}

const loadUserTimeline = async (username, page) => {
    let response = await enhancedFetch(POST_API + "/u/" + username + "/timeline?page=" + page, "get");
    return await response.json();
}

const isPostLikedByUser = async (postId) => {
    let response = await enhancedFetch(POST_API + "/" + postId + "/isliked", "get");
    return response.ok;
}

export default {
    isPostLikedByUser,
    loadUserTimeline,
    getSuggestions,
    createPost,
    likeCount,
    loadCommentsToPost,
    loadUserPosts,
    postComment,
    toggleLike,
    toggleFollow,
    getPost,
    getFollowers,
    getFollowing,
    getUser,
    getPostCount,
    isUserFollowedByMe,
    updateProfile,
    searchByFragment
};

