// Name: Ahmet EZER
// Student Number: 2200008227
// Same named-object patterns as JS, with structural types.
type Task = { id: string; title: string; status: 'todo' | 'in-progress' | 'done' };
// Form 5: named properties.
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' };
const { title, status } = task;
console.log('form 5:', title, status);

// Form 6: rename while destructuring.
const book: { title: string; pages: number } = { title: 'JavaScript Guide', pages: 250 };
const { title: heading } = book;
console.log('form 6:', heading);

// Form 7: an optional property becomes a plain string after a default.
const homework: { subject: string; priority?: string } = { subject: 'Web Programming' };
const { priority = 'normal' } = homework;
console.log('form 7:', priority);

// Form 8: typed object rest.
type Car = { id: number; brand: string; model: string; color: string };
const car: Car = { id: 1, brand: 'Porsche', model: 'Taycan Turbo S', color: 'Dolomite Silver Metallic' };
const { id, ...restOfCar } = car;
console.log('form 8:', id, restOfCar);

// Form 9: typed nested object and an array.
type Garage = { owner: { name: string }; cars: [string, ...string[]] };
const garage: Garage = { owner: { name: 'Ahmet EZER' }, cars: ['Porsche Taycan Turbo S', 'Clio 4'] };
const { owner: { name }, cars: [firstCar] } = garage;
console.log('form 9:', name, firstCar);

// Form 10: a literal key lets TypeScript infer the value type.
const student = { name: 'Ahmet EZER', department: 'Computer Engineering', grade: 150 };
const key: 'department' = 'department';
const { [key]: value } = student;
console.log('form 10:', value);
