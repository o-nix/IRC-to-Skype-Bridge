function IrcDefaultBinds(bot) {
	var msgs = bot.messages;
	
	msgs.IRC_CONNECTED.subscribe(function(status, irc) {
		bot.console.line(status || "Successfully connected to server.");
		
		irc.send(new IrcMessage.USER("service", "Welcome to the kafra service!"));
		irc.send(new IrcMessage.NICK("Kafra"));
	})
		
	msgs.IRC_DISCONNECTED.subscribe(function() {
		bot.console.line("Disconnected from server.");
	})
	
	msgs.IRC_MESSAGE.subscribe(function(data) {
		bot.console.line("<- ${1}".format(data));
	})
		
	msgs.IRC_MESSAGE_SENDING.subscribe(function(msg) {
		bot.console.line("-> [IrcMessage ${1}]".format(msg));
	})
	
	/**/
	
	msgs.register("IRC_PING").subscribe(function(data) {
		data.irc.send(new IrcMessage.PONG(data.params));
	})

	msgs.register("IRC_001").subscribe(function(data) {
		data.irc.variables['host'] = new Irc.Hostmask(data.params);
		
		bot.console.line(data.irc.variables.host);
		
		var channels = bot.settings.read("channels", "irc");
		
		if (channels) {
			channels.split(" ").each(function(channel) {
				data.irc.send(new IrcMessage.JOIN(channel));
			})
		}
	})
}