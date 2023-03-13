const Sleep = require("./modules/sleep");

const mineflayer = require("mineflayer");


const options = {
    host: "localhost",
    port: 62328,
    username: process.argv[2],
    version: "1.8.9",
    // auth:"microsoft"
}

const bot = mineflayer.createBot(options);
bot.on("login", async () => {
    bot.on("spawn", async () => {
        bot.chat(`./limbo`);
    });
});

bot.on("message", async (msg) => {
    if(msg.translate === "chat.type.text") {
        let string = "";

        msg.with.forEach(element => {
            string = string + element.text + " ";
        });
        string = string.substring(0, string.length - 1);
        console.log(string);

        // Check if the message is a party invite.
        if(string.includes("invited you to join their party")) {
            bot.chat(`./p join temp`);

            bot.on("message", async (msg) => {
                if(msg.translate === "chat.type.text") {
                    let string = "";

                    msg.with.forEach((element) => {
                        string = string + element.text + " ";
                    });
                    string = string.substring(0, string.length - 1);

                    if(string.includes("joined dungeon")) {
                        await Sleep(3000);
                        bot.chat(`./p leave`);
                        return;
                    }
                }
            });

            await Sleep(10000);
            bot.chat(`./p leave`);
        }
    } else if(msg.translate === "commands.generic.notFound") {
        console.log("The bot executed an unknown command.");
    } else if(msg.translate.startsWith("death")) {
        console.log("The bot died!");
    } else {
        console.log(msg);
    }
});

bot.on("kicked", console.log);
bot.on("error", console.log);