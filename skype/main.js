function Skype(bot) {
	var _skype = WSH.CreateObject("Skype4COM.Skype", "SkypeEvent");
	var msgs = bot.messages;

	msgs.get("IRC_PRIVMSG", true).subscribe(function(data) {
		if (data.target == "#zebrarium") {
			var enm = new Enumerator(_skype.BookmarkedChats);
			
			while (!enm.atEnd()) {
				var chat = enm.item();
				
				if (chat.Name == "#aridoku/$6612def854a71fa3") {
					chat.SendMessage("${1} -> ${2}".format((new Irc.Hostmask(data.from)).nick, data.params));
					
					break;
				}
				
				enm.moveNext();
			}
		}
	})
		
	msgs.register("SKYPE_CHAT", function(from, text) {
		bot.irc.send(new IrcMessage.CHANNEL("#zebrarium", "${1} -> ${2}".format(from, text)));
	})
	
	this.toString = function() {
		return "[object Skype]";
	}
	
	_skype.Attach();
	
	// Globals.
	
	SkypeEventMessageStatus = function(message, status) {
		bot.console.lines(message.ChatName, message.Body, status);
		
		if (message.ChatName == "#aridoku/$6612def854a71fa3" && status == cmsReceived) // cmsSending
			(new msgs.SKYPE_CHAT(message.FromHandle, message.Body)).defer()
	}
	
	SkypeEventContactsFocused = function(name) {
		bot.console.line(name);
	}
}