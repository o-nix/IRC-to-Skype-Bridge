function Skype(bot) {
	var _skype = WSH.CreateObject("Skype4COM.Skype", "SkypeEvent");

	bot.messages.get("IRC_PRIVMSG", true).subscribe(function(data) {
		if (data.target == "#channel") {
			_skype.SendMessage("cyrill.onix", data.params);
		}
	})
	
	this.toString = function() {
		return "[object Skype]";
	}
	
	_skype.Attach();
	
	// Globals.
	
	SkypeEventMessageStatus = function(message, status) {
		bot.console.lines(message.ChatName, message.Body, status);
	}
	
	SkypeEventContactsFocused = function(name) {
		bot.console.line(name);
	}
}