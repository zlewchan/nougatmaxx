const { Telegraf } = require('telegraf')
const fs = require('fs');

require('dotenv').config()

let catfacts = fs.readFileSync('assets/catfacts.txt').toString('UTF8').split('\n');
let nodiscord = [
    'Nie planujemy posiadać Discorda.', 
    'Kiedy będzie Discord? Jak Wyjdzie Half-Life 3', 
    'Kiedy będzie Discord? Jak firma, której nazwy nie wolno wymawiać będzie miała stabilne API',
    'Top 5 rzeczy ktore nigdy sie nie stana:\n1. Discord Wezuwiusza'
]
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
	ctx.replyWithPhoto({ url: "https://mobidziennik.pl/grafika/forbidden.jpg" }),
);


// Filters
bot.on('message', async ctx => { 
    let content = ctx.message.text;
    if (content !== undefined && content.toLowerCase().includes('discord')) {
        ctx.reply(RandomFromArray(nodiscord));
    }
})
  
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
