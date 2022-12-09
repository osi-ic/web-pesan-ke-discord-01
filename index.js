//Configurasi
const {
  Client,
  Events,
  GatewayIntentBits,
  WebhookClient,
} = require("discord.js");
const express = require("express");
require("dotenv").config();

//ExpressJS
const app = express();
const port = 3000;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const webhookClient = new WebhookClient({ url: process.env.webhook });

app.use(express.urlencoded());

//<========== Start Expressjs ==========>
app.get("/pesan/:pesan", (req, res) => {
  res.send(`
  <h2>/pesan/{pesanya}[?nama=namanya]</h1>
  <h3>{} : Harus di isi<h3>
  <h3>[] : opsional<h3>
  <br><br><br>
  
  Pesan : ${req.params.pesan} <br>
  Nama : ${req.query.nama} <br> <br> <br>
  <a href="/">Home</a> <br> <a href="/pesan/welcome">pesan link</a> <br> <a href="/form_pesan">pesan form</a>
  `);
  webhookSend(req.params.pesan, req.query.nama);
});

app.get("/form_pesan", (req, res) => {
  res.send(`<h2>Pesan Forms</h2>
	<form method="post" action="/form_pesan">
	  <label for="nama">Nama:</label><br>
	  <input type="text" id="nama" name="nama" value="Avin"><br>
	  <label for="pesan">Pesan:</label><br>
	  <input type="text" id="pesan" name="pesan"><br><br>
	  <input type="submit" value="Kirim">
	</form> <br> <br>
  <a href="/">Home</a> <br> <a href="/pesan/welcome">pesan link</a> <br> <a href="/form_pesan">pesan form</a>`);
});

app.post("/form_pesan", (req, res) => {
  webhookSend(req.body.pesan, req.body.nama);
  res.redirect("/form_pesan");
});

app.get("/", (req, res) => {
  res.send(
    `<a href="/">Home</a> <br> <a href="/pesan/welcome">pesan link</a> <br> <a href="/form_pesan">pesan form</a>`
  );
});

app.listen(port, () =>
  console.log(`Example app listening on port http://127.0.0.1:${port}/`)
);
//<========== End Expressjs ==========>

//<========== Start DiscordJS ==========>
client.once(Events.ClientReady, (c) =>
  console.log(`Ready! Logged in as ${c.user.tag}`)
);
const webhookSend = (pesan, nama) => {
  webhookClient.send({
    content: pesan,
    username: nama,
  });
};
//<========== End DiscordJS ==========>

// DiscordJS login
client.login(process.env.token);
