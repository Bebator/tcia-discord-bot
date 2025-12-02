const { Client, GatewayIntentBits } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// ============================
// CREDENCIALES TC-IA DEL PANEL
// ============================
const TCIA_API_KEY = "API-229efcb87aa8e504a77fe1640c81ea43";
const TCIA_TOKEN   = "TOKEN-f5cfbcfb8bd9eb34";

// ============================
// TOKEN DEL BOT DE DISCORD
// ============================
const DISCORD_TOKEN = "MTQ0NTIxOTUxMzYxMTMyNTQ4MA.GUXTrS.CsuXAmx2mkRkXruFCIfr3LADjud2QFMksN0UgQ";

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
        // Llamada a TC-IA
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
