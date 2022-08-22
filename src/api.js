import { http } from "./network";


class API {

    async getWork() {
        return await this.#check(await http.get("/work"));
    }

    async submitWork(body) {
        return await this.#check(await http.post("/work", body));
    }

    async writeStats(body) {
        return await this.#check(await http.post("/stats", body));
    }

    async enable() {
        return await this.#check(await http.get("/enable"));
    }

    async #check(resp) {
        const json = await resp.json();
        if (resp.status === 200) {
            return json.res;
        }
        if (resp.status === 500) {
            throw json.error;
        }
    }
}

export const api = new API();