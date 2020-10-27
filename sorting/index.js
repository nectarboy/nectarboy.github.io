//// ALGORITHM ////

var columns = 450;
var rows = 225;

var blocks = new Array (columns).fill (0);

var sortspeed = 10000;

var bgcolor = '#000000';
var blockcolor = '#ffffff';

var Render = function () {
	
	DISP_ctx.fillStyle = bgcolor;
	DISP_ctx.fillRect (
		0, 0,
		DISP_canvas.width, DISP_canvas.height
	);

	DISP_ctx.fillStyle = blockcolor;
	
	for (var i = 0; i < columns; i ++) {
		DISP_ctx.fillRect (
			i, rows,
			1, -blocks [i]
			
		);
	}

};

var Randomize = function () {

	for (var i = 0; i < columns; i ++) {
		var num = Math.round (Math.random () * rows);
		blocks [i] = num;
	}
	
	Render ();

};

var Sort = function () {

	DISP_result.innerHTML = '(result)'

	var current = 1;
	
	var Step = function () {
		for (var i = 0; i < sortspeed; i ++) {
		
			if (current > columns) {
			
				var valid = Validate ();
				
				var sound = new Audio ();
				
				if (valid) {
					DISP_result.innerHTML = 'all good :)';
					sound.src = 'https://img.ifunny.co/videos/c697cc894bb842a9c86d0c9158d7e7187406632ea44bf7758fa8448ae95bd1ed_1.mp4';
					sound.play ();
				}
				else {
					DISP_result.innerHTML = 'OH FUCK OH SHIT IT AINT GOOD';
					sound.src = 'http://gaben.web.elte.hu/Pocket%20Tanks%20Deluxe/weapdata/go/massdriver_buzzer.wav';
					sound.play ();
					console.log (blocks);
				}
				
				return Render ();
			
			}
			
			// --- Sorting Algorithm //
			
			var before = current - 1;
			
			var beforevalue = blocks [before];
			var currentvalue = blocks [current];
			
			if (beforevalue > currentvalue) {
				blocks [current] = beforevalue;
				blocks [before] = currentvalue;
				current = 1;
			}
			else {
				current ++;
			}
			
			// --- Sorting Algorithm //
		
		}
		setTimeout (Step, 0);
		requestAnimationFrame (Render);
	};
	
	Step ();

};

var Validate = function () {

	for (var i = 1; i < columns; i ++) {
	
		var before = i - 1;
		
		if (blocks [before] > blocks [i]) {
			return false;
		}
	
	}
	
	return true;

};

var RandomizeAndSort = function () {

	Randomize ();
	Sort ();

};

//// DISPLAY ////

var DISP = document.createElement ('div');

var DISP_canvas = document.createElement ('canvas');
	DISP_canvas.width = columns;
	DISP_canvas.height = rows;
	
var DISP_ctx = DISP_canvas.getContext ('2d');

var DISP_result = document.createElement ('pre');
	DISP_result.innerHTML = '(result)';
	
var DISP_button = document.createElement ('button');
	DISP_button.innerHTML = 'RANDOMIZE AND SORT';
	DISP_button.onclick = RandomizeAndSort;

document.body.appendChild (DISP);
	DISP.appendChild (DISP_canvas);
	DISP.appendChild (DISP_result);
	DISP.appendChild (DISP_button);
	
Render ();