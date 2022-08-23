import { io } from "socket.io-client";


if (!window.Worker) throw "Web Worker not supported";

const NUM_WORKERS = 4;

export function mine() {

    let workers = [];

    function terminateWorkers() {
        for (const worker of workers) worker.terminate();
        workers = [];
    }

    const socket = io("wss://localhost:9001");
    socket.on('work', function (work) {

        terminateWorkers();

        for (let i = 0; i < NUM_WORKERS; i++) {
            const worker = new Worker("src/yespower_worker.js");
            workers.push(worker);

            worker.onmessage = e => {
                if (e.data.type === "submit") {
                    socket.emit('submit', e.data.data);
                    terminateWorkers();
                }
                else if (e.data.type === "hashrate") {
                    socket.emit('hashrate', { hashrate: `${e.data.data} Kh/s` });
                }
            }

            worker.postMessage({ work: work });
        }
    });

}

