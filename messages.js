function Messages() {
	var _queue = [];
	var _ctx   = this;

	this.register = function(name, defaultSubscriber) {
		if (this[name] != null)
			throw new MessageAlreadyRegistered(name);

		var _subscribers = [];

		var constructor = function() {
			this.defer = function() {
				_queue.push(this);
			}
			
			this.data = arguments;
			
			this.toString = function() {
				return "[Message ${1}]".format(name);
			}
		}
		
		constructor.subscribe = function(callback) {
			if (_subscribers.indexOf(callback) == null)
				_subscribers.push(callback);
		}
		
		constructor.unsubscribe = function(callback) {
			var idx = _subscribers.indexOf(callback);
			
			if (idx != null)
				_subscribers.splice(idx, 1);
		}
		
		// If the callback function returns "false" then we do not send this message to others.
		constructor.send = function() {
			var args = arguments;
			
			_subscribers.each(function(callback) {
				if (callback.apply(constructor, args) === false)
					return false;
			})
		}
		
		// Second parameter of registration function will be considered as default message handler.
		if (defaultSubscriber != null)
			constructor.subscribe(defaultSubscriber);
		
		this[name] = constructor;
	}
	
	this.isRegistered = function(name) {
		return typeof(this[name]) == "function";
	}	
	
	MessagesReactor = function() {
		this.peekNext = function() {
			if (_queue.length > 0)
				return _queue.shift();
			else
				return new _ctx.IDLE;
		}
		
		this.processNext = function() {
			var msg = this.peekNext();
			msg.constructor.send.apply(msg.constructor, msg.data);
		}
		
		this.toString = function() {
			return "[object MessagesReactor]";
		}
	}

	//
	
	this.register("QUIT", function() {
		WSH.Quit();
	})

	this.register("IDLE", function() {
		WSH.Sleep(1);
	})
}

Messages.prototype.toString = function() {
	return "[object Messages]";
}