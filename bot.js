const { Client, GatewayIntentBits } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// ============================
// CREDENCIALES TC-IA DEL PANEL
// (AHORA SE TOMAN DESDE RAILWAY)
// ============================
const TCIA_API_KEY = process.env.TCIA_API_KEY;
const TCIA_TOKEN   = process.env.TCIA_TOKEN;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    console.log(`🔥 TC-IA conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    try {
        const respuesta = await fetch("https://top-conquerors.com/IATC/api.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api: TCIA_API_KEY,
                token: TCIA_TOKEN,
                usuario: msg.author.username,
                mensaje: msg.content
            })
        });

        const data = await respuesta.json();

        if (data.respuesta) {
            msg.reply(data.respuesta);
        } else {
            msg.reply("⚠ TC-IA no respondió.");
        }

    } catch (err) {
        console.log(err);
        msg.reply("❌ Error conectando con TC-IA.");
    }
});

// Iniciar BOT
client.login(DISCORD_TOKEN);
