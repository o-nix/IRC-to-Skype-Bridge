function SkypeBot() {
	var _consoleCommands = new EssentialConsoleCommands(this);
	
	this.console = new BotConsole(function(line) {
		if (_consoleCommands[line]) {
			_consoleCommands[line]();
			
			return;
		}
		
		try {
			var result = eval(line);
			
			if (result !== undefined)
				this.line("> ${1}".format(result));
		}
		catch (e) {
			this.line("Error: ${message}".format(e));
		}
	})
	
	this.messages = new Messages();
	this.messagesReactor = new MessagesReactor();
	
	_consoleCommands.register();
	delete _consoleCommands.register;
	
	this.console.show();
}