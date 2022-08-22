
class HTTP {

    #getHeaders(token) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    }

    async get(path, token) {
        return await fetch(path, {
            method: 'GET',
            headers: this.#getHeaders(token)
        });
    }

    async put(path, body, token) {
        return await fetch(path, {
            method: 'PUT',
            headers: this.#getHeaders(token),
            body: JSON.stringify(body)
        });
    }

    async post(path, body, token) {
        return await fetch(path, {
            method: 'POST',
            headers: this.#getHeaders(token),
            body: JSON.stringify(body)
        });
    }

}

export const http = new HTTP();
