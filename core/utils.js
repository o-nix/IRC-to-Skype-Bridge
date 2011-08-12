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
	},
		
	extendObject: function(object, other, clone) {
		if (clone)
			other = Utils.cloneObject(other);
		
		for (var name in other)
			object[name] = other[name];
	},
		
	cloneObject: function(object) {
		var clone = object;
		
		if (object instanceof Array) {
			clone = [];
			
			object.each(function(elem, idx) {
				clone[idx] = Utils.cloneObject(elem)
			})
		}
		else if (object instanceof Object) {
			clone = {};
			
			for (var name in object)
				clone[name] = Utils.cloneObject(object[name]);
		}
		
		return clone;
	}
}