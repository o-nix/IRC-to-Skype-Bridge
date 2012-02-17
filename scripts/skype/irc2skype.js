bot.messages.get("IRC_PRIVMSG", true).subscribe(function(data) {
	if (bot.settings.readArray("from", "skype").indexOf(data.target) !== null) {
		var chat = bot.skype.getEngine().Chat(bot.settings.read("handle", "skype"));
		
		chat.SendMessage('${1}${3} ${2}'.format((new Irc.Hostmask(data.from)).nick, data.params, data.target));
	}
})
	
bot.messages.register("SKYPE_CHAT", function(chatName, from, text, status) {
	if (from != bot.skype.getEngine().CurrentUserHandle && chatName == bot.settings.read("handle", "skype")) {
		var text = "${1} -> ${2}".format(from, text);
		
		bot.settings.readArray("to", "skype").each(function(channelName) {
			bot.irc.send(new IrcMessage.CHANNEL(channelName, text));
		})
	}
})