Array.prototype.getIterator = function() {
	var _ctx = this;
	
	return {
		current: -1,
		hasNext: function() {
			return this.current != _ctx.length - 1;
		},
		next: function() {
			this.current++;
			return _ctx[this.current];
		}
	}
}

Array.prototype.each = function(visitor) {
	var iterator = this.getIterator();
	
	while (iterator.hasNext()) {
		var ret = visitor.call(this, iterator.next(), iterator.current);
		
		if (ret === false)
			break;
	}
}

Array.prototype.indexOf = function(given, strict) {
	var result = null;
	
	this.each(function(elem, idx) {
		if (strict) {
			if (elem === given) {
				result = idx;
				
				return false;
			}
		}
		else {
			if (elem == given) {
				result = idx;
				
				return false;
			}
		}	 
	})
		
	return result;
}

Array.prototype.asObject = function(labels) {
	var result = {};
	var _ctx = this;
	
	labels.each(function(label, idx) {
		if (label != null)
			result[label] = _ctx[idx];
	})
		
	return result;
}