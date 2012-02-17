function Settings(bot) {
	var _reader = WSH.CreateObject("Kafra.IniReader");
	var _lastSection = null;
	var _file = null;
	
	function _setSection(section) {
		if (section != null)
			_lastSection = section;
		
		return _lastSection;
	}
	
	this.setFile = function(file) {
		_file = file;
		
		_reader.SetFile("${1}\\${2}".format(bot.shell.CurrentDirectory, file));
	}
	
	this.setSection = function(section) {
		_lastSection = section;
	}
	
	this.read = function(key, section) {		
		return _reader.ReadString(_setSection(section), key);
	}
	
	this.readBool = function(key, section) {
		var result = this.read(key, section);
		
		if (result && (result == "1" || result == "true"))
			return true;
		else
			return false;
	}
	
	this.readArray = function(key, section, delimiter) {
		var result = [];
		
		if (typeof(delimiter) == "undefined")
			delimiter = " ";
		
		var ret = this.read(key, section);

		ret.split(delimiter).each(function(elem) {
			if (elem.length > 0)
				result.push(elem);
		})
			
		return result;
	}
	
	this.readDefault = function(key, def) {
		if (typeof(def) == "undefined")
			def = null;
		
		var result = this.read(key);
	
		return result ? result : def;	
	} 
	
	this.write = function(key, value, section) {
		return _reader.WriteString(_setSection(section), key, value);
	}
	
	this.toString = function() {
		return "[Settings ${1} [${2}]]".format(_file || "no file set", _lastSection || "no section set");
	}
}