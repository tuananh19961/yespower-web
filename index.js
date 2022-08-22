if (!window.Worker) throw "Web Worker not supported";

const NUM_WORKERS = 4;

export function mine() {

    let workers = [];

    const webSocket = new WebSocket(url, protocols);

    webSocket.onopen = (event) => {
    };

    webSocket.onmessage = (event) => {

        try {

            for (const worker of workers) worker.terminate();
            workers = [];

            for (let i = 0; i < NUM_WORKERS; i++) {
                const worker = new Worker("src/yespower.js");
                workers.push(worker);

                worker.onmessage = e => {

                    try {
                        if (e.data.type === "submit") {
                            webSocket.send(JSON.stringify(e.data.data));
                        }
                        else if (e.data.type === "hashrate") {
                            webSocket.send(JSON.stringify({
                                hashrate: `${e.data.data} Kh/s`
                            }));
                        }
                    } catch (error) {
                        console.error(error);
                    }

                }

                worker.postMessage({ work: JSON.parse(event.data) });
            }
        } catch (error) {
            console.error(error);
        }
    };
}

