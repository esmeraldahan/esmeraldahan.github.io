function Neontext(id) {
	var ele = document.getElementById(id),
		eletext = ele.innerText,
		arr = eletext.split(""),
		_this = this,
		win = window;
	this.resetTime = 20; 
	this.color = [
		'#4040ff', '#A6CDE7', '#62A5D1',
		'#0000cd','#9EDBE4', '#43B4C5',
		'#1472B1', '#052032', '#191970',
		'#6565B0'
	];
	this.randomColor = function() {
		var colorIndex = Math.floor(this.color.length * Math.random());
		return this.color[colorIndex];
	}

	this.posRangencala = function() {
			return ele.hasAttribute("ele-range") ? {
				minRange: {
					x: ele.offsetLeft,
					y: ele.offsetTop
				},
				maxRange: {
					x: ele.offsetLeft + ele.offsetWidth,
					y: ele.offsetTop + ele.offsetHeight
				}
			} : {
				minRange: {
					x: 0,
					y: 0
				},
				maxRange: {
					x: document.documentElement.clientWidth,
					y: document.documentElement.clientHeight
				}
			}
		}
		
	this.spanArr = (function() {
		ele.innerHTML = "";
		var spanArr = [];
		arr.forEach(function(value, index) {
			var spanDom = document.createElement("span");
			spanDom.style.display = "inline-block";
			spanDom.innerHTML = value;
			spanDom.style.position = "relative";
			spanDom.style.zIndex = ele.hasAttribute("ele-range") ? "1" : "-1";
			spanDom.style.color = _this.randomColor();
			spanDom.own = {
				pos: {
					x: 0,
					y: 0
				},
				ran: {
					x: -.5 + Math.random(),
					y: -.5 + Math.random()
				},
				speed: {
					x: 1,
					y: 1
				},
				dir: {
					x: 1,
					y: 1
				}
			}
			ele.appendChild(spanDom);
			spanArr.push(spanDom);
		})
		return spanArr;
	})()
	this.spanOrigin = function() {
		this.spanArr.forEach(function(value, index) {
			value.own.realPos = {
				minx: value.offsetLeft,
				maxx: value.offsetLeft + value.offsetWidth,
				miny: value.offsetTop,
				maxy: value.offsetTop + value.offsetHeight
			}
		})
		this.posRangen = this.posRangencala();
	}
	this.spanOrigin();
	this.resetpos = function() {
		this.spanOrigin();
		console.log(ele + "====" + this.spanArr[0].own.pos.x + "====" + this.posRangen.maxRange.x)
		this.spanArr.forEach(function(span, index) {
			if(span.own.realPos.minx + span.own.pos.x < _this.posRangen.minRange.x) span.own.pos.x = 0;
			if(span.own.realPos.maxx + span.own.pos.x > _this.posRangen.maxRange.x) span.own.pos.x = 0;
			if(span.own.realPos.miny + span.own.pos.y < _this.posRangen.minRange.y) span.own.pos.y = 0;
			if(span.own.realPos.maxy + span.own.pos.y > _this.posRangen.maxRange.y) span.own.pos.y = 0;
		})
	}
	this.floatText = function() {
		this.spanArr.forEach(function(span, index) {
			if(span.own.realPos.minx + span.own.pos.x < _this.posRangen.minRange.x || span.own.realPos.maxx + span.own.pos.x > _this.posRangen.maxRange.x) span.own.dir.x = -span.own.dir.x;
			if(span.own.realPos.miny + span.own.pos.y < _this.posRangen.minRange.y || span.own.realPos.maxy + span.own.pos.y > _this.posRangen.maxRange.y) span.own.dir.y = -span.own.dir.y;
			span.own.pos.x += span.own.ran.x * span.own.speed.x * span.own.dir.x;
			span.own.pos.y += span.own.ran.y * span.own.speed.y * span.own.dir.y;
			span.style.transform = "translateX(" + span.own.pos.x + "px) translateY(" + span.own.pos.y + "px)";
		})
	}
	this.floatBack = function() {
		this.spanArr.forEach(function(value, index) {
				var x = value.own.pos.x - value.own.pos.x * _this.resetTime / 100;
				var y = value.own.pos.y - value.own.pos.y * _this.resetTime / 100;
				value.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
			})
			//			  console.log(this.resetTime)
		if(this.resetTime === 100) {
			cancelAnimationFrame(_this.send);
			return true;
		} else {
			this.resetTime += 5;
		}

	}
	this.restart = function() {
		this.spanArr.forEach(function(value, index) {
			value.own.pos.x = 0;
			value.own.pos.y = 0;
		})
	}
	this.render = {
		run: function() {
			_this.sren = requestAnimationFrame(_this.render.run);
			_this.floatText();
		},
		end: function() {
			_this.send = requestAnimationFrame(_this.render.end);
			_this.floatBack();
		},
		killer: function() {
			if(_this.floatBack()) {
				cancelAnimationFrame(_this.send);
				_this.restart();
				_this.resetTime = 10;
				_this.render.run();
			} else {
				cancelAnimationFrame(_this.sren);
				_this.render.end();
			}
		}
	}
	window.onresize = function() {
		_this.resetpos();
	}
}