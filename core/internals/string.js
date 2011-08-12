String.prototype.format = function() {
	var args = arguments;
	
	return this.replace(/\$\{([A-Za-z0-9_]+)\}/g, function(base, element, position) {
		for (var i = 0; i < args.length; i++) {
			if (args[i] != null && typeof(args[i][element]) != "undefined")
				return args[i][element];
		}


		if (typeof(args[element - 1]) == "undefined")
			return base;
		else {
			var elem = args[element - 1];
			
			if (elem === null)
				return "null";
			else
				return elem;
		}
	})
}