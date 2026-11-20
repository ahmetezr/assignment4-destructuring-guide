// Name: Ahmet EZER
// Student Number: 2200008227
// Five destructuring pitfalls, each with observable output.
// Pitfall 1: destructuring undefined/null as an entire source throws.
try {
  const { a } = undefined;
  console.log(a);
} catch (error) {
  console.log('pitfall 1:', error.constructor.name);
}

// Pitfall 2: a default handles undefined, not null.
const { color: color1 = 'Black' } = { color: undefined };
const { color: color2 = 'Black' } = { color: null };
console.log('pitfall 2:', color1, color2);

// Pitfall 3: assignment starting with an object pattern needs parentheses.
let carBrand = 'BMW';
const carInfo = { carBrand: 'Porsche' };
({ carBrand } = carInfo);
console.log('pitfall 3:', carBrand);

// Pitfall 4: nested objects stay shared references, not deep copies.
const originalCar = { brand: 'Porsche', model: 'Taycan Turbo S', engine: { power: 761 } };
const { engine } = originalCar;
engine.power = 952;
console.log('pitfall 4:', originalCar.engine.power, 'HP');

// Pitfall 5: objects match property names; arrays match indices.
const carDetails = { brand: 'Porsche', model: 'Taycan Turbo S' };
const { model, brand } = carDetails;
const carList = ['Porsche', 'Renault'];
const [firstCar, secondCar] = carList;
console.log('pitfall 5 object:', model, brand);
console.log('pitfall 5 array:', firstCar, secondCar);
