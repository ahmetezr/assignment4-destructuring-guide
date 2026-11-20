// Name: Ahmet EZER
// Student Number: 2200008227
// The same array examples as JavaScript, now with TypeScript types.
// Form 1: a tuple keeps the exact types and positions of two returned items.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)];
}
const [lowest, highest] = minMax([4, 9, 2]);
console.log('form 1:', lowest, highest);

// Form 2: skip first element, take second, collect rest.
const songs: string[] = ['Eşik Taşı', 'Senden İnsaf Diler Yarın', 'Urfa Sana Küsmüş', 'Biz Ne Ayrılıklar Görmüş Adamız'];
const [, second, ...others] = songs;
console.log('form 2:', second, others);

// Form 3: assignment swapping is the same syntax.
let color1: string = 'Siyah';
let color2: string = 'Beyaz';
[color1, color2] = [color2, color1];
console.log('form 3:', color1, color2);

// Form 4: optional tuple entries can use numeric defaults.
const emptyPair: [number?, number?] = [];
const [age = 20, score = 100] = emptyPair;
console.log('form 4:', age, score);
