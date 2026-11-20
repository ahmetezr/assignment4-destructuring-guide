// Name: Ahmet EZER
// Student number: 2200008227
// Bonus 2: Depth - independent destructuring experiments
// Run: node bonus2-depth.mjs

console.log('BONUS 2: DEPTH');

// Experiment 1: Strings and Sets are iterables, not arrays.
const [letter1, letter2, ...remainingLetters] = 'PORSCHE';
const [firstSet, ...restSet] = new Set(['Porsche', 'TOGG', 'Porsche', 'Renault']);
console.log('1 string:', letter1, letter2, remainingLetters.join(''));
console.log('1 set:', firstSet, restSet);

// Experiment 2: Lazily produced values from a generator.
function* modelGenerator() {
  yield 'Taycan';
  yield 'M4';
  yield 'Clio';
}
const [firstModel, secondModel, ...otherModels] = modelGenerator();
console.log('2 generator:', firstModel, secondModel, otherModels);

// Experiment 3: Default evaluation and side effects.
let defaultCallCount = 0;
function defaultPower() { defaultCallCount++; return 952; }
const [powerDefined = defaultPower()] = [761];
const [powerMissing = defaultPower()] = [];
console.log('3 defaults:', powerDefined, powerMissing, 'calls:', defaultCallCount);
const [basePower = 761, tunedPower = basePower + 191] = [];
console.log('3 previous binding:', basePower, tunedPower);

// Experiment 4: Object assignments in a try/catch and for..of entries.
try { throw new Error('Missing car specification'); }
catch ({ message }) { console.log('4 catch:', message); }
const car = { brand: 'Renault', power: 130 };
let tunedBrand = '', tunedPowerValue = 0;
([car.brand, car.power] = ['Renault', 160]);
({ brand: tunedBrand, power: tunedPowerValue } = car);
console.log('4 assignment targets:', tunedBrand, tunedPowerValue);

// Experiment 5: Left-to-right evaluation, nesting and readability.
let sideEffects = 0;
const defaults = { first: undefined, second: 12 };
const { first: firstDefault = (++sideEffects), second: secondDefault = (++sideEffects) } = defaults;
console.log('5 lazy object defaults:', firstDefault, secondDefault, 'calls:', sideEffects);
const full = { garage: { owner: { name: 'Ahmet' }, cars: ['Taycan', 'Clio'] } };
const { garage: { owner: { name: complexName }, cars: [complexFirstCar] } } = full;
const garage = full.garage;
const readableName = garage.owner.name;
const readableCar = garage.cars[0];
console.log('5 deep:', complexName, complexFirstCar);
console.log('5 refactored:', readableName, readableCar);
