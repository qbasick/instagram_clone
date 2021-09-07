const API_URL = "http://localhost:8080/api/auth";

export const register = (username, password) => {
    return fetch(API_URL + "/register", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json;charset=utf-8'
        },
        body: JSON.stringify({username, password})
    });
}

export const login = async (username, password) => {
    let response = await fetch(API_URL + "/login", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json;charset=utf-8'
        },
        body: JSON.stringify({username, password})
    });
    let text = await response.text();
    if (response.ok) {
        localStorage.setItem('user', username);
        localStorage.setItem('token', text);
    }
    //console.log( JSON.parse(atob(text.split('.')[1])));
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export const getCurrentUser = () => {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
}
