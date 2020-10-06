var interpretbf = function (program, domout) {

	console.log ('starting program ...');

	domout.innerHTML = ''; // clear //

	// remove comments and whitespace and all that //

	var code = '';

	{
		var accepted = ['>','<','+','-','[',']',',','.'];

		for (var i = 0; i < program.length; i ++) {
			for (var j = 0; j < accepted.length; j ++) {
				if (program [i] == accepted [j]) {

					code += (program [i]);
					break;

				}
			}
		}
	};

	// initialize the program //

	var output = '';

	var memory = new Uint8Array (30000);

	var astack = [];

	var mempoint = 0; // memory location //
	var prgpoint = 0; // what point program on //

	var stop = false;

	var operators = {

		'>': function () {
			mempoint ++;
		},
		'<': function () {
			mempoint --;
			mempoint < 0 ? 0 : mempoint; // noty noty ah ?
		},
		'+': function () {
			memory [mempoint] ++;
		},
		'-': function () {
			memory [mempoint] --;
		},
		'[': function () {
			if (memory [mempoint])
				astack.push (prgpoint);
			else {
				let count = 0;
                while (true) {
                    prgpoint++;
                    if (!code [prgpoint]) break;
                    if (code [prgpoint] === "[") count++;
                    else if (code [prgpoint] === "]") {
                        if (count) count--;
                        else break;
                    }
                }
			}
		},
		']': function () {
			prgpoint = astack.pop () - 1; // dec to get proper location
		},
		',': function () {
			// input
			var char = prompt ('input char');
			if (typeof char != 'string')
				memory [mempoint] = 0;
			else
				memory [mempoint] = char.charCodeAt ();
		},
		'.': function () {
			// output
			var char = String.fromCharCode (memory [mempoint]);
			output += (char);
		}

	};

	var memdump = function () {

		console.log ('done !\nmemdump:\n',memory);

	};

	var step = function () {
		if (!code [prgpoint]) {
			stop = true;
			return;
		}
		operators [code [prgpoint]] ();
		domout.innerHTML = output; // show output so far
		prgpoint ++;

	};

	// EXECUTION

	// two methods:

	var slowloop = function () {
		if (stop)
			return memdump ();
		step ();
		setTimeout (slowloop,0);

	};

	var fastloop = function () {
		while (!stop)
			step ();
		memdump ();
	};

	fastloop ();

};