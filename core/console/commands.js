function EssentialConsoleCommands(bot) {
	var _ctx = this;
	var msgs = bot.messages;
	
	msgs.CONSOLE_TEXT.subscribe(function(text) {
		text = text.replace(/^\./, "");
		
		var cons = bot.console;
		var args = text.split(" ");
		var key  = args.shift();
		
		if (_ctx[key]) {
			_ctx[key].apply(_ctx, args);
		}
		else {
			try {
				var result = eval(text);
				
				if (result !== undefined)
					cons.line("> ${1}".format(result));
			}
			catch (e) {
				cons.line("Error: ${message}".format(e));
			}
		}
	})
	
	this.quit = function() {
		bot.irc.send(new IrcMessage.QUIT("bye!"));
		bot.irc.disconnect();
		(new msgs.QUIT()).defer();
	}
}