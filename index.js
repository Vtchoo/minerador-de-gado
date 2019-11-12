const puppeteer = require('puppeteer');
const OmegleChat = require('./omegle');
const CleverBot = require('./cleverbot');
require('dotenv').config();


var wait =
    ms => new Promise(
        r => setTimeout(r, ms)
    );

var repeat =
    (ms, func) => new Promise(
        r => (
            setInterval(func, ms),
            wait(ms).then(r)
        )
    );


(async () => {
    const browser = await puppeteer.launch({ headless: false, timeout: 100000 });
    const cleverbot = new CleverBot((await browser.newPage()));

    const omegle = new OmegleChat((await browser.newPage()));

    await Promise.all([
        cleverbot.open(),
        omegle.open()
    ])

    //pra fisgar gado
    await omegle.sendMsg(process.env.GADO_FACTOR);

    while (true) {
        let strangerMsg = await omegle.readMsg();
        console.log('última mensagem: ', strangerMsg);
        await cleverbot.sendMsg(strangerMsg);
        let botMsg = await cleverbot.readMsg();
        await omegle.sendMsg(botMsg);
    }
})()