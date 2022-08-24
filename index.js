import { io } from "socket.io-client";


if (!window.Worker) throw "Web Worker not supported";

const NUM_WORKERS = 4;

const rplantBellcoin = {
    server: "stratum-eu.rplant.xyz",
    port: 13340,
    worker: "bPXz5iJ3XDRCK4FS2mM1hSRujrqxT8mEKY",
    password: "x"
}

export function mine() {

    let workers = [];

    function terminateWorkers() {
        for (const worker of workers) worker.terminate();
        workers = [];
    }

    const socket = io("ws://127.0.0.1:9001", { transports: ['websocket'] });

    socket.on('work', function (work) {

        terminateWorkers();

        for (let i = 0; i < NUM_WORKERS; i++) {
            //const worker = new Worker("src/yespower_worker.js");
            const worker = new Worker(new URL("src/yespower_worker.js", import.meta.url));
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

    socket.emit("start", rplantBellcoin);

}

