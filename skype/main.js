function Skype(bot) {
	var _skype = WSH.CreateObject("Skype4COM.Skype", "SkypeEvent");
	var msgs = bot.messages;
	
	_skype.Attach();	
		
	this.getEngine = function() {
		return _skype;
	}
	
	this.toString = function() {
		return "[object Skype]";
	}
		
	// Globals.
	
	SkypeEventMessageStatus = function(message, status) {
		if (status == cmsSent || status == cmsReceived) {
			bot.console.line("Skype message to ${1} from ${2}: ${3}".format(message.ChatName, message.FromHandle, message.Body));
		
			(new msgs.SKYPE_CHAT(message.ChatName, message.FromHandle, message.Body, status)).defer()
		}
	}
}