# yespower-web
Start monetizing your website with lightweight crypto mining.
## Why mining
Cryptos have a place in the website monetization. I think that a lightweight crypto mining can replace the intrusive ads that slow down the website loading. Mining is silent and transparent for the user. It works in background and keeps the website loading fast.
## Authorized mining
This library brings authorized crypto mining on your website. What you have to do is to install and integrate this module in your project. Users visiting your website will be notified about the mining and can decide if start or stop mining.
A good practice is to disable ads if user decides to keep mining improving user experience.
## Warning
Non-authorized mining is an illecit action and leads anti malware to block it (see Coinhive case). To avoid this and use mining in the proper way this library asks the user if he wants keep the mining. This is why I discourage you to modify this behavior in the source code. If you want keep mining monetization please use this module as is.
## Yespower
The implemented miner uses [yespower](https://www.openwall.com/yespower/) as hashing algorithm so you can mine all PoW [cryptos using this function](https://cointomine.today/algorithm/yespower/). Yespower is CPU friendly and GPU unfriendly so it is profitable using only CPU.
## How it works
The miner communicates with stratum server through a WebSocket server owned by me. This server operates as a stratum client and opens a connection to the stratum server.
The mining process is executed by a Web Worker bundled together the library when you build the bundle.
### Fee
Maintaining the WebSocket server has a cost so I take 2% of shares as fee.
## Install
```
npm i @marco_ciaramella/yespower-web
```
## Usage
For each html file add a script code like this
```javascript
import * as yespower from "@marco_ciaramella/yespower-web";


let mining = false;
try {
    mining = yespower.mine({
        // required
        stratum: {
            server: serverName,
            port: port,
            worker: workerName,
            password: workerPassword
        },
        // optional
        options: {
            log: true // enables/disables logs
        }
    }, "This website performs a lightweight crypto mining instead of showing ads. Do you want enable mining?");
} catch (error) {
    console.error(error);
}

if (!mining) {
    showAds();
}
```
`yespower.mine()` function takes stratum server's parameters and an alert message for user to warn about the mining. The message will be shown only once during the session.
## Note
I want repeat this point. Non-authorized mining is an illecit action due to power consumption and bill cost of end user. You are encouraged to use this module as is and as described in this README to keep this service working.