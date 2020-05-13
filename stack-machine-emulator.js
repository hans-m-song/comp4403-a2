const stack = [0];
const v = [0, 1, 2, 3]; // array type
const lower = v[0]; // lower bound
const upper = v[v.length - 1]; // upper bound
const width = upper + 1 - lower; // array width
console.log({stack, v, lower, upper, width});

const log = (op) => console.log(op, '\t', stack);
const push = (val) => stack.push(val);
const pop = () => stack.pop();
const op = (opcode, val) => {
  let x, y;
  switch(opcode) {
    case 'LOAD':
      push(val);
      break;
    case 'ADD':
      x = pop(), y = pop();
      push(x + y);
      break;
    case 'DUP':
      x = pop();
      push(x);
      push(x);
      break;
    case 'NEGATE':
      x = pop();
      push(-x);
    case 'EQUAL':
      x = pop(), y = pop();
      push(x === y ? 1 : 0);
      break;
    case 'LESS':
      x = pop(), y = pop();
      push(x > y ? 1 : 0);
      break;
    case 'LESSEQ':
      x = pop(), y = pop();
      push(x >= y ? 1 : 0);
      break;
    case 'MPY':
      x = pop(), y = pop();
      push(x * y);
      break;
  }
  log(opcode || '');
}

const succ = () => {
  op('DUP');
  op('LOAD', upper)
  op('EQUAL');
  op('LOAD', -width);
  op('MPY')
  op('ADD');
  op('LOAD', 1);
  op('ADD');
}

const pred = () => {
  op('DUP');
  op('LOAD', lower);
  op('EQUAL');
  op('LOAD', width);
  op('MPY');
  op('ADD');
  op('LOAD', -1);
  op('ADD');
}

op('LOAD', 0); // reference to address
pred();

console.log(stack[stack.length - 1]);