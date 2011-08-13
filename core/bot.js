function SkypeBot(global) {
	this.toString = function() {
		return "[object SkypeBot]";
	}
	
	this.global = global;
	
	this.messages = new Messages();
	this.messagesReactor = new MessagesReactor();
	
	this.console = new BotConsole(this);
	new EssentialConsoleCommands(this);
	
	this.irc = new Irc(this);
	new IrcMessages(this, this.irc);
	new IrcDefaultBinds(this);
	
	this.skype = new Skype(this);
	
	this.console.show();
	this.irc.connect(new Irc.Server("irc.anarxi.st", 6669));
}

