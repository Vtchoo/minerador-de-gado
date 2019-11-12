module.exports = class OmegleChat {
    constructor(page) {
        console.log(page);
        this.page = page;
        this.countMsgs = 0;
    }

    async open() {
        await this.page.goto('http://www.omegle.com');
        await this.page.waitFor("#textbtn");
        await this.page.click("#textbtn");
        await this.page.waitFor('button');
    }

    async disconnect() {
        await this.page.waitFor("button.diconnectbtn");
        await this.page.click("button.diconnectbtn");
        await this.page.click("button.diconnectbtn");

    }

    async verify() {
        if (!(await this.page.evaluate("document.querySelector('.newchatbtnwrapper').innerText == undefined "))) {
            await this.page.click(".newchatbtnwrapper");
            this.countMsgs = 0;
        };

    }

    async readMsg() {
        await this.page.waitFor('.strangermsg');
        await this.page.waitForFunction(`[...document.querySelectorAll('.strangermsg')].length > ${this.countMsgs}`, { timeout: 100000 });
        this.countMsgs = await this.page.evaluate(`[...document.querySelectorAll('.strangermsg')].length `);
        return await this.page.evaluate('[...document.querySelectorAll(".strangermsg")].slice(-1)[0].children[1].innerText');

    }

    async sendMsg(msg) {
        await this.page.waitFor("textarea.chatmsg");
        await this.page.type("textarea.chatmsg", msg, { delay: 150 });
        await this.page.click("button.sendbtn");
    }
}
