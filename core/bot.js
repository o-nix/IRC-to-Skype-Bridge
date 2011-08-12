function SkypeBot(global) {
	var bot = this;
	
	this.global = global;
	
	this.messages = new Messages();
	this.messagesReactor = new MessagesReactor();
	
	this.console = new BotConsole(this);
	new EssentialConsoleCommands(this);
	
	this.irc = new Irc(this);
	new IrcMessages(this, this.irc);
	new IrcDefaultBinds(this);
	
	this.console.show();
	this.irc.connect(new Irc.Server("irc.anarxi.st", 6669));
}

SkypeBot.prototype.toString = function() {
	return "[object SkypeBot]";
}