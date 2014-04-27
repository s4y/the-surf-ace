// socket input from the server
;(function(exports) {
	var Sock = function() {
		var socket = new WebSocket("ws://ace:3001");
		var self = this;
		socket.onopen = function() {
			socket.send(JSON.stringify({
				fn: 'createRoom',
				args: {'id': 'room'}
			}));
		};
		socket.onmessage = function(msg) {
			var data = JSON.parse(msg.data);
			self.data.sharks[data.index][data.msg] = data.value;
		};
		this.socket = socket;

		var self = this;
		window.onkeydown = function(e) {
			var shark = self.data.sharks[0];
			switch(e.which) {
				case 38:
					shark.depth = -1;
					break;
				case 40:
					shark.depth = 1;
					break;
				case 37:
					shark.direction = -1;
					break;
				case 39:
					shark.direction = 1;
					break;
			}
		};
		window.onkeyup = function(e) {
			var shark = self.data.sharks[0];
			switch(e.which) {
				case 38:
				case 40:
					shark.depth = 0;
					break;
				case 37:
				case 39:
					shark.direction = 0;
					break;
			}
		};
	};

	Sock.prototype = {
		data: {
			sharks: [
				{
					direction: 0,
					depth: 0
				},
				{
					direction: 0,
					depth: 0
				},
				{
					direction: 0,
					depth: 0
				}
			]
		},
		updateData: function(data) {
			this.data = data;
		},
		getSharkData: function(sharkID) {
			return this.data.sharks[sharkID];
		}
	};
	exports.Sock = Sock;
})(window);
