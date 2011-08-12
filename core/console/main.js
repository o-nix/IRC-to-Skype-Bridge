function BotConsole(bot) {
	var _console = WSH.CreateObject("Kafra.Console", "ConsoleEvent");
	var _instance = this;
	var msgs = bot.messages;
	
	this.show = function(state) {
		if (typeof(state) == "undefined" || state)
			_console.Show();
		else
			_console.Hide();
	}
	
	this.line = function(text) {
		_console.WriteLine(text);
	}
	
	this.lines = function() {
		for (var i = 0; i < arguments.length; i++)
			this.line(arguments[i]);
	}
	
	msgs.register("CONSOLE_TEXT");
	
	// Sorry, but it must be global.
	ConsoleEventOnNewInputLine = function(line) {
		(new msgs.CONSOLE_TEXT(line)).defer();
	}
}

BotConsole.prototype.toString = function() {
	return "[object BotConsole]";
}