import { io } from "socket.io-client";

/**
 * Starts mining.
 * @param {object} params stratum's parameters (required) and options (optional)
 * @param {string} msg alert message for user
 * @returns {boolean} true if user keeps mining, false otherwise
 */
export function mine(params, msg) {

    if (!confirm(msg)) return false;

    if (!window.Worker) throw "Web Worker not supported";

    const log = params.options ? params.options.log : false;
    const NUM_WORKERS = 1;
    let workers = [];

    function print(...msgs) {
        log && console.log(...msgs);
    }

    function terminateWorkers() {
        for (const worker of workers) worker.terminate();
        workers = [];
    }

    const socket = io("wss://yespower-web.com", { transports: ['websocket'] });

    socket.on('can start', () => socket.emit("start", params.stratum));

    socket.on('work', function (work) {

        print("new work:", work);

        terminateWorkers();

        for (let i = 0; i < NUM_WORKERS; i++) {
            //const worker = new Worker("src/yespower_worker.js");
            const worker = new Worker(new URL("src/yespower_worker.js", import.meta.url));
            workers.push(worker);

            worker.onmessage = e => {
                if (e.data.type === "submit") {
                    print("share found!");
                    socket.emit('submit', e.data.data);
                    terminateWorkers();
                }
                else if (e.data.type === "hashrate") {
                    const hashrate = `${e.data.data} Kh/s`;
                    print("hashrate:", hashrate);
                    socket.emit('hashrate', { hashrate: hashrate });
                }
            }

            worker.postMessage({ work: work });
        }
    });

    return true;
}

