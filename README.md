# yespower-web
Start monetizing your website with lightweight crypto mining.
## Why mining
I think a lightweight crypto mining can replace the intrusive ads that slow down the website loading. Mining is silent and transparent for the user. It works in background and keeps the website loading fast.
## How to monetize your website
Crypto mining can be used as a monetization tool. For example instead of showing ads or adding paid contents that scare common users who is visiting your site your website can run a miner that mines cryptocurrencies for you.
### Warning
You should warn the user about the background mining. Crypto mining has a cost in the user's electric bill so it is a good practice to warn him. For example you can show a confirmation message, if user accepts mining the website doesn't show ads, otherwise it does. Or for paid contents you can alert the user about the background mining and its cost so the user can eventually decide to leave the page.
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