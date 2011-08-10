function Irc(bot) {
	// Dirty hack with global callback functions and counter for supporting multiple networks.
	this.constructor._counter = (this.constructor._counter || 0) + 1;
	var prefix = "Irc${1}Event".format(this.constructor._counter);
	var msgs = bot.messages;
	
	var _ctx = this;
	var _irc = WScript.CreateObject("Kafra.Network", prefix);
	var _server = null;
	
	msgs.register("IRC_CONNECTED");
	msgs.register("IRC_DISCONNECTED");
	msgs.register("IRC_RAW_MESSAGE");
	msgs.register("IRC_MESSAGE_SENDING");
	
	this.state = Irc.State.Empty;
	this.variables = {};
	
	this.connect = function(server) {
		if (!(server instanceof Irc.Server))
			throw new WrongParameter("server");
		
		this.state = Irc.State.Connecting;
		_server = server;
		
		_irc.Connect(server.host, server.port);
	}
	
	this.send = function(msg) {
		_irc.SendLine(msg);
		
		(new msgs.IRC_MESSAGE_SENDING(msg)).defer();
	}
	
	this.toString = function() {
		return "[Irc ${1}, ${2}]".format(_server || "[no server]", this.state);
	}

	// Global events.
	// Fucking magic happens here.

	bot.global["${1}OnConnect".format(prefix)] =  function(status) {
		(new msgs.IRC_CONNECTED(status, _ctx)).defer();
		
		_ctx.state = Irc.State.Connected;
	}
	
	bot.global["${1}OnClose".format(prefix)] = function() {
		(new msgs.IRC_DISCONNECTED(_ctx)).defer();
		
		_ctx.state = Irc.State.Disconnected;
	}

	bot.global["${1}OnRead".format(prefix)] = function(data) {
		(new msgs.IRC_RAW_MESSAGE(data, _ctx)).defer();
	} 
}

Irc.State = Utils.makeEnum([
	"Empty",
	"Connecting",
	"Connected",
	"Disconnected"
])

Irc.Server = function(host, port) {
	this.host = host;
	this.port = port;
	
	this.toString = function() {
		return "[server ${host}:${port}]".format(this);
	}
}

Irc.Hostmask = function(text) {
	var parsed = /(\S+)\!(\S+)\@(\S+)/.exec(text);
	
	this.nick  = null;
	this.ident = null;
	this.host  = null;
	
	if (parsed != null)
		Utils.extendObject(this, parsed.asObject([null, "nick", "ident", "host"]));
	
	this.build = function() {
		return "${nick}!${ident}@${host}".format(this);
	}
	
	this.toString = function() {
		return "[hostmask ${1}]".format(this.build());
	}
}

