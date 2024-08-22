const { Telegraf } = require('telegraf')
const fs = require('fs');

require('dotenv').config()

let catfacts = fs.readFileSync('assets/catfacts.txt').toString('UTF8').split('\n');

let roll = [
    "Tak",
    "Nie",
    "Może",
    "Xiaomi lepsze"
]

function RandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}

const bot = new Telegraf(process.env.BOT_TOKEN)

// Garbage
bot.start((ctx) => ctx.reply('Dzień dobry!'))

bot.command('roll', async (ctx) => {
    ctx.reply("Odpowiedź to: " + RandomFromArray(roll))
})

bot.command('catfact', async (ctx) => {
    ctx.reply(RandomFromArray(catfacts));
})

bot.command("zrzutbazy", ctx =>
	ctx.sendSticker("CAACAgQAAxkBAAIZ2mauiLbJZUfaChOCkMYRARgeQiS1AAKYEgACyqlwUdwpnNbpDrfqNQQ")
);
  
bot.launch({ dropPendingUpdates: true }, () => console.log("Bot is starting!"));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
