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
				return "[message ${1}]".format(name);
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
		
		constructor.send = function() {
			_subscribers.each(function(callback) {
				if (callback.apply(constructor, arguments) === false)
					return false;
			})
		}
		
		if (defaultSubscriber != null)
			constructor.subscribe(defaultSubscriber);
		
		this[name] = constructor;
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
	}

	//
	
	this.register("IDLE", function() {
		WSH.Sleep(1);
	})
}