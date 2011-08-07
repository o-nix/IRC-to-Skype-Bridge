Utils = {
	makeEnum: function(array) {
		var result = {};
		
		array.each(function(elem, idx) {
			result[elem] = {
				valueOf: function() {
					return idx;
				},
				toString: function() {
					return "[${1}]".format(elem);
				}
			}
		})
			
		return result;
	}
}