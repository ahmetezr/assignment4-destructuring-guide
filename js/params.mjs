// Name: Ahmet EZER
// Student Number: 2200008227
// Parameter and loop destructuring (forms 11 and 12).
// Form 11: defaults in an object parameter pattern.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status };
}
console.log('form 11:', createTask({ title: 'Read' }));

// Form 11b (additional parameter pattern): receive an array in a function.
const showCar = ([brand, model]) => `${brand} ${model}`;
console.log('form 11b:', showCar(['Porsche', 'Taycan Turbo S']));

// Form 12: array pairs from Object.entries and Map iteration.
const carSpecs = { Porsche: 952, TOGG: 435, Renault: 160 };
for (const [brand, horsepower] of Object.entries(carSpecs)) {
  console.log('form 12 object:', brand, horsepower, 'HP');
}
const carModels = new Map([
  ['Porsche', 'Taycan Turbo S'],
  ['TOGG', 'T10X 4More Obsidyen'],
  ['Renault', 'Clio 1.3 Tce'],
]);
for (const [brand, model] of carModels) {
  console.log('form 12 map:', brand, model);
}
