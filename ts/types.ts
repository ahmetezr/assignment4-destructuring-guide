// Name: Ahmet EZER
// Student Number: 2200008227
// What only TypeScript adds (topics T1 to T5).
// T1: A colon inside a pattern means renaming, not typing.
const point = { x: 1, y: 2 };
const { x: horizontal } = point;
console.log('T1:', horizontal);
// `const { x: string } = point` would rename x into a variable called string.
const coordinates: { x: number; y: number } = { x: 10, y: 20 };
const { x: positionX }: { x: number } = coordinates;
console.log('T1 typed:', positionX);

// T2: Tuple return type and readonly literal tuple from as const.
function getCarInfo(): [number, string] { return [952, 'Porsche Taycan Turbo S']; }
const [horsepower, carModel] = getCarInfo();
console.log('T2 tuple:', horsepower, carModel);
const carData = [952, 'Porsche Taycan Turbo S'] as const;
const [fixedPower, fixedModel] = carData;
console.log('T2 as const:', fixedPower, fixedModel);

// T3: noUncheckedIndexedAccess adds undefined to array index reads.
const cars: string[] = ['Porsche', 'TOGG', 'Renault'];
const [first] = cars;
if (first !== undefined) console.log('T3 first:', first);
else console.log('T3 first: no car found');
const emptyCars: string[] = [];
const [missingCar] = emptyCars;
console.log('T3 missing:', missingCar);

// T4: Optional property versus default initializer.
type CarOptions = { brand: string; color?: string };
const carOptions: CarOptions = { brand: 'Porsche' };
const { color } = carOptions;
const { color: defaultColor = 'Black' } = carOptions;
console.log('T4 optional:', color);
console.log('T4 default:', defaultColor);

// T5: Deliberate, single allowed compile-time error and corrected code.
type Engine = { power: number };
const engine: Engine = { power: 952 };
// @ts-expect-error: Property 'horsepower' does not exist on type 'Engine'.
const { horsepower: invalidPower } = engine;
console.log('T5 invalid property:', invalidPower);
const { power: validPower } = engine;
console.log('T5 fixed:', validPower);
