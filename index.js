import { io } from "socket.io-client";

/**
 * Starts mining.
 * @param {object} params stratum's parameters
 * @param {string} msg alert message for user
 * @returns {boolean} true if user keeps mining, false otherwise
 */
export function mine(params, msg) {

    if (!confirm(msg)) return false;

    if (!window.Worker) throw "Web Worker not supported";

    const NUM_WORKERS = 1;
    let workers = [];

    function terminateWorkers() {
        for (const worker of workers) worker.terminate();
        workers = [];
    }

    const socket = io("ws://206.189.53.131:9001", { transports: ['websocket'] });

    socket.on('can start', () => socket.emit("start", params));

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

    return true;
}

