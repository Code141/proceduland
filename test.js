const { performance } = require('perf_hooks'); // NODE DEP

process.stdout.write('\033c'); // CLEAR SHELL
let LINE_SIZE = process.stdout.columns;




// WRITE A GETTER / SETTER TO INVOKE COLOR AS FUNCTION
// color(background.red)
// => exec => PRINT(this.background.red)
let color = {
	special: {
		reset : "\x1b[0m",
		bright : "\x1b[1m",
		dim : "\x1b[2m",
		underscore : "\x1b[4m",
		blink : "\x1b[5m",
		reverse : "\x1b[7m",
		hidden : "\x1b[8m",
	},
	text :{
		black : "\x1b[30m",
		red : "\x1b[31m",
		green : "\x1b[32m",
		yellow : "\x1b[33m",
		blue : "\x1b[34m",
		magenta : "\x1b[35m",
		cyan : "\x1b[36m",
		white : "\x1b[37m",
	},
	background:{
		black : "\x1b[40m",
		red : "\x1b[41m",
		green : "\x1b[42m",
		yellow : "\x1b[43m",
		blue : "\x1b[44m",
		magenta : "\x1b[45m",
		cyan : "\x1b[46m",
		white : "\x1b[47m",
	}
};



function PRINT(...args){
	const len = args.length;
	for (let i = 0, j = len; i < j; i++)
	{
		process.stdout.write(args[i]);
	}
}

function LOG_LINE(...args){
	const len = args.length;

	let total = 0;
	for (let i = 0, j = len; i < j; i++)
		total += args[i].length;

	PRINT(...args);
	let delta = LINE_SIZE - total; 
	while(delta-- > 0)
		PRINT(" ");
	PRINT("\n");
}

function PAD(char, nb){
	let i = 0;
	while (i++ < nb)
		PRINT(char)
}

function PAD_LINE(char, nb){
	PAD(char, nb)
	PRINT("\n")
}

function HEADER(name){
	PAD_LINE("=", 80)
	LOG_LINE(`= ${name}`);
	PAD_LINE("=", 80)
	PRINT(color.special.reset)
}

function CODE(name, cb){

	PRINT(color.text.magenta)
	PRINT("- ", name, " ")
	PAD_LINE("=", 40 - 3 - name.length)

	PRINT(color.text.white)

	LOG_LINE(cb.toString().replace(/\t/g, '  '));

	PRINT(color.special.reset)
}

function exec_test(name,  cbMock, cbTest) {
	let mock = cbMock() ?? [];

	PRINT(color.text.green)
	HEADER(name)
	PRINT(color.special.reset)

	CODE("MOCK", cbMock)
	CODE("TEST", cbTest)

	let timestamp = performance.now();
	cbTest(mock)
	let delta = performance.now() - timestamp;

	/*
	PRINT(color.text.red, color.background.black)
	console.log("Performance :", delta)
	PRINT(color.special.reset)
	*/
	return delta;
}





let LEN = 30000;
let tests = {
	/*
	"emptyTest": {
		mock: () => {},
		test: () => {}
	},

*/

	"Array for": {
		mock: () => new Array(LEN),
		test: (array) => {
			for(let i=0; i < LEN; i++){
				array[i] = "";
			}
		}
	},
	"Array map": {
		mock: () => new Array(LEN).fill(0),
		test: (array) => {
			array.map(e => e = "")
		}
	},
	"Array for dynamic": {
		mock: () => [],
		test: (array) => {
			for(let i=0; i < LEN; i++){
				array[i] = "";
			}
		}
	},
	"Array map dynamic": {
		mock: () => new Array(LEN).fill(0),
		test: (array) => {
			array.map(e => e = "")
		}
	},


	"Array spread while a for": {
		mock: () => {},
		test: () => {
			let newArray = [];
			for(let i=0; i < LEN; i++){
				newArray = [ ...newArray, ""];
			}
		}
	},


	"Objet for in": {
		mock: () => {
			let x={}
			for (let i = 0; i < LEN; i++)
				x[i] = "";
			return x
		}
		,
		test: (object) => {
			for (let key in object)
				object[key] = "";
		}
	},


}


// while changin LEN, best and worst change NON LINEAR way
// you must benchmark all for many length

results = [];
for (let name in tests)
{
	let test = tests[name];
	results.push(
		{
			name: name,
			perf: exec_test(name, test.mock, test.test)
		}
	)
}

HEADER(`RESULTS LEN: ${LEN}`)

results.map(e => {
	PRINT(e.name)
	PAD(" ", 30 - e.name.length)	
	PRINT(String(e.perf.toFixed(3)),"ms", "\n")
})




/*
let x={}
for (let key in o)
{
	x[key] = o[key]
}




let m = new Array(LEN);
for(let t=0; t< LEN; t++){
	for(let u=0; u< LEN; u++){
		m[u] = a[u];
	}
}

let acube = new Array(LEN);
a.map(() => {
	a.map((e2, i) => {
		acube[i] = e2
	})
})


let y={}
for (let key in o)
{
	for (let key2 in o)
	{
		y[key2] = o[key2]
	}
}



let z={}
Object.keys(o).map((k, i) => {
	Object.keys(o).map((k2, i2) => {
		z[k2] = i2
	})
})



let p = {};
for (let [k, v] of Object.entries(o))
{

	for (let [k2, v2] of Object.entries(o))
	{
		p[k2] = v2;
	}
}




process.stdout.write(color.background.blue);
process.stdout.write("hello: ");
process.stdout.write(HEADER.toString());
process.stdout.write(color.special.reset);

*/
