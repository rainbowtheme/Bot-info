const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true}); // botnya tidak akan bisa mention @everyone
const config = require("./config.json"); // kita akan menaruh prefix dan token disini

bot.on("ready", async () => {
	console.log(`${bot.user.username} Sudah online!`);
	bot.user.setActivity("Bot Info", {type: "PLAYING"});	
});

bot.on("message", async message => {
	if (message.author.bot) return; // bot kita tidak akan menjawab jika command dikirim oleh bot lain
	if (message.channel.type === 'dm') return; // bot kita tidak akan menjawab jika kita menggunakan command di DM atau PM

	let prefix = config.prefix;
	let messageArray = message.content.split(" "); // command bisa disisipkan spasi
	let cmd = messageArray[0];
	let args = messageArray.slice(1);


	if (cmd === `${prefix}botinfo`) {
		let bicon = bot.user.displayAvatarURL; // untuk menampilkan avatar dari bot kalian
		let botembed = new Discord.RichEmbed()
		.setAuthor("Informasi Bot")
		.setColor("RANDOM") // kalian juga bisa menggunakan kode HEX, cari di google
		.setThumbnail(bicon) // thumbnail dari avatar bot kalian tadi
		.addField("Nama Bot", bot.user.username)
		.addField("Dibuat", bot.user.createdAt);

		message.channel.send(botembed); // untuk mengirim embed yang sudah dibuat diatas..
	}

	if (cmd === `${prefix}serverinfo`) {
		let sicon = message.guild.iconURL; // kalau server gunakan icon bukan displayAvatar
		let serverembed = new Discord.RichEmbed()
		.setAuthor("Informasi Server")
		.setColor("RANDOM")
		.setThumbnail(sicon)
		.addField("Nama Server", message.guild.name) // nama dari guildnya
		.addField("Dibuat", message.guild.createdAt) // tanggal dibuat guildnya
		.addField("Kamu Join", message.member.joinedAt) // tanggal kamu join guild
		.addField("Owner", message.guild.owner); // owner dari guild

		message.channel.send(serverembed);
	}
});


bot.login(config.token);
