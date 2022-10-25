const input = document.querySelector(".input");
const result = document.querySelector(".result");
const buttons = document.querySelector(".buttons");
let exp = "";
let calculated = false;
let wasNumber = false;
buttons.addEventListener("click", event => {
	// return if non-button is clicked
	if (!(value = event.target.dataset.value)) return;
	
	if (value === "=") {
		// dont calculate if last is operator
		if (!wasNumber) return;
		
		calculated = true;
		result.innerText = "= " + calc(exp);
	} else {
		if (calculated) {
			exp = "";
			calculated = false;
		}
		
		// if non-number is clicked change the operator
		let isNumber = !Number.isNaN(+value);
		if (!isNumber && !wasNumber) exp = exp.slice(0, -1);
		wasNumber = isNumber;
		
		exp += value;
		input.innerText = pretty(exp);
		result.innerText = null;
	}
});

// let exp = "1.24 + -3.26 * -0.256 _ 2.4";
// console.log(pretty(exp), "＝", calc(exp));

// calculate string
// note: use _ for subtraction
function calc(str) {
	
	// remove all whitespace
	str = str.replaceAll(" ", "");
	
	let operators = [];
	let indexes = [];
	
	// find operators and their indexes
	for (let i = 0; i < str.length; i++) {
		if (str[i] == "+") {
			operators.push("+");
			indexes.push(i);
		} else if (str[i] == "*") {
			operators.push("*");
			indexes.push(i);
		} else if (str[i] == "/") {
			operators.push("/");
			indexes.push(i);
		} else if (str[i] == "_") {
			operators.push("_");
			indexes.push(i);
		}
	}
	
	// store numbers into array using operator indexes
	let numbers = [];
	let last = 0;
	for (let i = 0; i < operators.length; i++) {
		numbers.push(Number(str.substring(last, indexes[i])));
		last = indexes[i] + 1;
	}
	numbers.push(Number(str.substring(last)));
	
	// while there are 2 or more numbers, calculate next operator
	while (numbers.length > 1) {
		let result = oper(operators, numbers);
		// if oper fails, break loop
		if (!result) break;
	}
	
	// round number to 10 decimal place
	// parse float to remove trailing 0s
	let number = parseFloat(numbers[0].toFixed(10));
	
	// return final number
	return number;
}

// operate one operator
function oper(operators, numbers) {
	
	// find first * or /
	let n = -1;
	for (let i = 0; i < operators.length; i++) {
		if (operators[i] == "*" || operators[i] == "/") {
			n = i;
			break;
		}
	}
	// if there are no * or /, find first + or -
	if (!~n) {
		for (let i = 0; i < operators.length; i++) {
			if (operators[i] == "+" || operators[i] == "_") {
				n = i;
				break;
			}
		}
	}
	// if there are no operators return false
	if (!~n) return false;
	
	// operate
	if (operators[n] == "*") {
		numbers[n] = numbers[n] * numbers[n + 1];
	} else if (operators[n] == "+") {
		numbers[n] = numbers[n] + numbers[n + 1];
	} else if (operators[n] == "/") {
		numbers[n] = numbers[n] / numbers[n + 1];
	} else if (operators[n] == "_") {
		numbers[n] = numbers[n] - numbers[n + 1];
	}
	
	// remove used operator and number
	operators.splice(n, 1);
	numbers.splice(n + 1, 1);
	
	// oper success
	return true;
}


// returns string in pretty format
function pretty(str) {
	
	// remove all whitespace
	str = str.replaceAll(" ", "");
	
	// replace operators and add spacing
	return str.replaceAll("_", " － ").replaceAll("*", " × ").replaceAll("+", " ＋ ").replaceAll("/", " ÷ ");
}