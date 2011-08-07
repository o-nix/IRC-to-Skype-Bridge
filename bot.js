function SkypeBot(global) {
	var bot = this;
	
	this.global = global;
	
	this.messages = new Messages();
	this.messagesReactor = new MessagesReactor();
	
	this.console = new BotConsole(this);
	new EssentialConsoleCommands(this);
	
	this.irc = new Irc(this);
	new IrcMessages(this, this.irc);
	
	this.console.show();
	this.irc.connect(new Irc.Server("irc.mv.ru", 6669));
}

SkypeBot.prototype.toString = function() {
	return "[object SkypeBot]";
}