function IrcMessages(bot, irc) {
	var msgs = bot.messages;
	
	msgs.register("IRC_MESSAGE", function(data) {
		bot.console.line(data);
	})
	
	msgs.IRC_CONNECTED.subscribe(function(status) {
		bot.console.line(status || "Successfully connected to server.");
	})
		
	msgs.IRC_DISCONNECTED.subscribe(function() {
		bot.console.line("Disconnected from server.");
	})
		
	msgs.IRC_RAW_MESSAGE.subscribe(function(line) {
		var parsed = /^(?::([^ ]+) )?([a-zA-Z0-9]+)(?:(?: )([^:]+))?(?:(?: :)(.*))?$/.exec(line);
		var data = new IrcMessage(parsed[1] || "", parsed[2].toUpperCase(), parsed[3] || "", parsed[4] || "");
		
		(new msgs.IRC_MESSAGE(data)).defer();
	})
}

function IrcMessage(from, command, target, params) {
	this.from = from;
	this.command = command;
	this.target = target;
	this.params = params;
	
	this.toString = function() {
		return '[IrcMessage "${from}", "${command}", "${target}", "${params}"]'.format(this);
	}
}