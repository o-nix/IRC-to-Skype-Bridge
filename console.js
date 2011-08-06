function BotConsole(handler) {
	var _console = WSH.CreateObject("Kafra.Console", "ConsoleEvent");
	var _instance = this;
	
	this.handler = handler || function() {};
	
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
	
	// Sorry, but it must be global.
	ConsoleEventOnNewInputLine = function(line) {
		_instance.handler.call(_instance, line);
	}
}