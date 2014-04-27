;(function(exports) {
	var Game = function() {
		var width = $(window).width();
		var height = $(window).height();
		this.c = new Coquette(this, "canvas", width, height, "#000");
		this.c.sock = new Sock();

		this.c.renderer._ctx.imageSmoothingEnabled = false;

		this.c.entities.create(Ocean, {size: { x:width, y:height }});
		this.c.entities.create(Surfer, {});

		this.c.entities.create(Shark, { id: 0, colorMatrix: COLOR_MATRIX_RED });
		this.c.entities.create(Shark, { id: 1, colorMatrix: COLOR_MATRIX_GREEN, spriteNumber: 10});
	};

	window.addEventListener('load', function() {
		game = new Game();
	});
})();
