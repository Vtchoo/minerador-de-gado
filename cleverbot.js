const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = class CleverBot {
    constructor(page) {
        console.log(page);
        this.page = page;
        this.countMsgs = 0;
    }

    async open() {
        await this.page.goto('http://www.cleverbot.com', { timeout: 100000, waitUntil: 'domcontentloaded' });
        await this.page.waitFor("input.stimulus");
    }

    /* async disconnect() {
        await this.page.waitFor("input.stimulus");
        await this.page.click("button.diconnectbtn");
        await this.page.click("button.diconnectbtn");

    } */

    /*  async connect() {
         await this.page.waitFor(".newchatbtnwrapper");
         await this.page.click(".newchatbtnwrapper");
     } */

    async readMsg() {
        await this.page.waitFor(`#line1 > #snipTextIcon`, { timeout: 100000 });
        return await this.page.evaluate(`document.querySelector("#line1 > span.bot").innerText`);
    }

    async sendMsg(msg) {
        await this.page.waitFor("input.stimulus");
        await this.page.type("input.stimulus", msg);
        await this.page.keyboard.press('Enter');
    }
}
