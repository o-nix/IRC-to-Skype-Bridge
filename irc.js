function Irc(bot) {
	// Dirty hack with global callback functions and counter for supporting multiple networks.
	this.constructor._counter = (this.constructor._counter || 0) + 1;
	var prefix = "Irc${1}Event".format(this.constructor._counter);
	var msgs = bot.messages;
	
	var _irc = WScript.CreateObject("Kafra.Network", prefix);
	var _server = null;
	
	msgs.register("IRC_CONNECTED");
	msgs.register("IRC_DISCONNECTED");
	msgs.register("IRC_RAW_MESSAGE");
	
	this.state = Irc.State.empty;
	
	this.connect = function(server) {
		if (!(server instanceof Irc.Server))
			throw new WrongParameter("server");
		
		_irc.Connect(server.host, server.port);
	}
	
	this.toString = function() {
		return "[Irc ${1}, ${2}]".format(_server || "[no server]", this.state);
	}

	// Global events.

	bot.global["${1}OnConnect".format(prefix)] =  function(status) {
		(new msgs.IRC_CONNECTED(status)).defer();
	}
	
	bot.global["${1}OnClose".format(prefix)] = function() {
		(new msgs.IRC_DISCONNECTED()).defer();
	}

	bot.global["${1}OnRead".format(prefix)] = function(data) {
		(new msgs.IRC_RAW_MESSAGE(data)).defer();
	} 
}

Irc.State = Utils.makeEnum([
	"empty",
	"connecting",
	"connected",
	"disconnected"
])

Irc.Server = function(host, port) {
	this.host = host;
	this.port = port;
	
	this.toString = function() {
		return "[server ${host}:${port}]".format(this);
	}
}

