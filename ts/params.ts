// Name: Ahmet EZER
// Student Number: 2200008227
// Forms 11 and 12 in TypeScript and the typing rules for parameters.
type TaskInput = { title: string; status?: 'todo' | 'done' };
// Form 11: type annotation after the entire parameter pattern.
function createTask({ title, status = 'todo' }: TaskInput) { return { title, status }; }
console.log('form 11:', createTask({ title: 'Read' }));
// Form 11b: array tuple parameter.
const showCar = ([brand, model]: [string, string]): string => `${brand} ${model}`;
console.log('form 11b:', showCar(['Porsche', 'Taycan Turbo S']));
// Form 12: destructuring entries in for...of over Object and Map.
const carSpecs: Record<string, number> = { Porsche: 952, TOGG: 435, Renault: 160 };
for (const [brand, horsepower] of Object.entries(carSpecs)) console.log('form 12 object:', brand, horsepower, 'HP');
const carModels: Map<string, string> = new Map([
 ['Porsche', 'Taycan Turbo S'], ['TOGG', 'T10X 4More Obsidyen'], ['Renault', 'Clio 1.3 Tce']
]);
for (const [brand, model] of carModels) console.log('form 12 map:', brand, model);
