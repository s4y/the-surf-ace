;(function(exports) {

	var MIN_EFFECTIVENESS = -1000;

	exports.Sharknet = function(game, settings) {
		this.c = game.c;
		initObject(this, settings);
		this.boundingBox = this.c.collider.RECTANGLE;
		this.center = {
			x: settings.center.x,
			y: settings.center.y
		};
		this.hasRunColorMatrix = false;
		if (this.type == "surfboard") {
			this.colorMatrix = [[0, Math.random(), 0], [0, Math.random(), 0], [0, Math.random(), 0]];
		}
		this.sprites = new SpriteSheet('./resource/'+ this.type + '/' + this.type, this.numSprites, this.colorMatrix);

		this.zindex = 100;
	};

	exports.Sharknet.prototype = {
		size: {
			x: 100,
			y: 100
		},
		speed: {
			x: 5,
			y: 5
		},
		effectiveness: 500,
		color: 'yellow',
		spriteNumber: 0,
		draw: function(ctx) {
			if(!this.sprites.isReady()) return;
			this.sprites.draw(ctx, this.center, this.size);
		},
		update: function(dt) {
			this.center.y += this.speed.y * (dt/16.66);
			this.center.x += this.speed.x * (dt/16.66);
			this.effectiveness -= dt;

			if (this.effectiveness <= 0) {
				if (!this.hasRunColorMatrix) {
					this.hasRunColorMatrix = true;
					this.zindex = -60;
					this.speed = {
						x: this.speed.x / 2,
						y: 1
					};
				}
			}
			if (this.effectiveness <= MIN_EFFECTIVENESS) {
				this.die();
			}
		},
		die: function(){
			this.c.entities.destroy(this);
		}
	};
})(window);
