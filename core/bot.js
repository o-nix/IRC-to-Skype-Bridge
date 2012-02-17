function SkypeBot(global) {
	var _ctx = this;
	
	this.toString = function() {
		return "[object SkypeBot]";
	}
	
	this.global = global;
	this.shell = WSH.CreateObject("WScript.Shell");
	
	this.settings = new Settings(this);
	this.settings.setFile("settings.ini");
	
	this.messages = new Messages();
	this.messagesReactor = new MessagesReactor();
	
	this.console = new BotConsole(this);
	new EssentialConsoleCommands(this);
	
	this.irc = new Irc(this);
	this.ircServers = [];
	new IrcMessages(this, this.irc);
	new IrcDefaultBinds(this);
	
	if (this.settings.readBool("enabled", "irc")) {
		this.ircServers = this.settings.readArray("servers");
		
		this.ircServers.each(function(server, index) {
			var parts = server.split(":");
			var port = 6667;
			
			server = parts.shift();
			
			if (parts.length > 0)
				port = parts.pop();
			
			_ctx.ircServers[index] = new Irc.Server(server, port)
		})
				
		if (this.ircServers) {
			this.messages.get("IRC_DISCONNECTED").subscribe(function(irc) {
				bot.console.line("Irc network disconnected. Trying next server...");
				
				irc.connect(bot.ircServers.next())
			})
				
			this.irc.connect(this.ircServers.next());			
		}
	}
		
	
	//this.skype = new Skype(this);
		
	this.console.show();
}

