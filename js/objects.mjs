// Name: Ahmet EZER
// Student Number: 2200008227
// Object destructuring (forms 5 to 10).
// Form 5: take named properties, regardless of declaration order.
const task = { id: 't1', title: 'Buy milk', status: 'todo' };
const { title, status } = task;
console.log('form 5:', title, status);

// Form 6: rename an extracted property.
const book = { title: 'JavaScript Guide', pages: 250 };
const { title: heading } = book;
console.log('form 6:', heading);

// Form 7: a missing property uses its default.
const homework = { subject: 'Web Programming' };
const { priority = 'normal' } = homework;
console.log('form 7:', priority);

// Form 8: take id, then gather remaining own enumerable properties.
const car = { id: 1, brand: 'Porsche', model: 'Taycan Turbo S', color: 'Dolomite Silver Metallic' };
const { id, ...restOfCar } = car;
console.log('form 8:', id, restOfCar);

// Form 9: nested object and array patterns.
const garage = { owner: { name: 'Ahmet EZER' }, cars: ['Porsche Taycan Turbo S', 'Clio 4'] };
const { owner: { name }, cars: [firstCar] } = garage;
console.log('form 9:', name, firstCar);

// Form 10: use the runtime value of key to choose a property.
const student = { name: 'Ahmet EZER', department: 'Computer Engineering', grade: 150 };
const key = 'department';
const { [key]: value } = student;
console.log('form 10:', value);
