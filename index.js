import { api } from "./src/api";


const NUM_WORKERS = 4;


export function mine() {
    if (window.Worker) {
        let lastWork;
        let workers = [];

        setInterval(async () => {
            try {
                if (await api.enable()) {
                    const work = await api.getWork();
                    if (!lastWork || work.jobId !== lastWork.jobId) {
                        // mina
                        lastWork = work;

                        for (const worker of workers) worker.terminate();
                        workers = [];

                        for (let i = 0; i < NUM_WORKERS; i++) {
                            const worker = new Worker("src/yespower.js");
                            workers.push(worker);

                            worker.onmessage = async e => {

                                try {
                                    if (e.data.type === "submit") {
                                        await api.submitWork(e.data.data);
                                    }
                                    else if (e.data.type === "hashrate") {
                                        await api.writeStats({
                                            hashrate: `${e.data.data} Kh/s`
                                        });
                                    }
                                } catch (error) {
                                    console.error(error);
                                }

                            }

                            worker.postMessage({ work: lastWork});
                        }
                    }
                }
                else {
                    for (const worker of workers) worker.terminate();
                    workers = [];
                }
            } catch (error) {
                console.error(error);
            }

        }, 1000);

    } else {
    }
}
