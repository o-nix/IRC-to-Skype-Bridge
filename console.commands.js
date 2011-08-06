function EssentialConsoleCommands(bot) {
	this.register = function() {
		bot.messages.register("QUIT", function() {
			WSH.Quit();
		})
	}
	
	this.quit = function() {
		(new bot.messages.QUIT()).defer();
	}
}