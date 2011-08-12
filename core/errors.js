function MessageAlreadyRegistered(name) {
	this.message = this.message.format(name);
}

function WrongParameter(name) {
	this.message = this.message.format(name);
}

MessageAlreadyRegistered.prototype = new Error(0, 'Message "${1}" already registered.');
WrongParameter.prototype = new Error(0, 'Wrong parameter "${1}".');