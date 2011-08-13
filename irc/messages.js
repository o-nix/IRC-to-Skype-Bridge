function IrcMessages(bot, irc) {
	var msgs = bot.messages;
	
	msgs.register("IRC_MESSAGE", function(data) {
		var msg = msgs.get("IRC_" + data.command.toUpperCase(), true); // Register a message if not registered yet.
		
		(new msg(data)).defer();
	})
	
	msgs.IRC_RAW_MESSAGE.subscribe(function(line, irc) {
		var parsed = /^(?::([^ ]+) )?([a-zA-Z0-9]+)(?:(?: )([^:]+))?(?:(?: :)(.*))?$/.exec(line);
		var data = new IrcMessage(parsed[1] || "", parsed[2].toUpperCase(), parsed[3] || "", parsed[4] || "");
		
		data.irc = irc;
		
		(new msgs.IRC_MESSAGE(data)).defer();
	})
}

function IrcMessage(from, command, target, params) {
	this.from = from;
	this.command = command;
	this.target = target;
	this.params = params;
	
	this.irc = null;
	
	this.toString = function() {
		return '[IrcMessage "${from}", "${command}", "${target}", "${params}"]'.format(this);
	}
}

IrcMessage.NICK = function(nick) {
	this.toString = function() {
		return "NICK ${1}".format(nick);
	}
}

IrcMessage.USER = function(ident, realname) {
	this.toString = function() {
		return "USER ${1} 8 * :${2}".format(ident, realname);
	}
}

IrcMessage.PONG = function(server) {
	this.toString = function() {
		return "PONG ${1}".format(server);
	}
}

IrcMessage.QUIT = function(reason) {
	this.toString = function() {
		return "QUIT :${1}".format(reason);
	}
}

IrcMessage.CHANNEL = function(channel, text) {
	this.toString = function() {
		return "PRIVMSG ${1} :${2}".format(channel, text);
	}
}