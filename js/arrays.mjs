// Name: Ahmet EZER
// Student Number: 2200008227
// Array destructuring (forms 1 to 4).
// Form 1: receive two positional values returned by a function.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)

// Form 2: skip the first element and collect remaining ones with rest.
const songs = ["Eşik Taşı", "Senden İnsaf Diler Yarın", "Urfa Sana Küsmüş", "Biz Ne Ayrılıklar Görmüş Adamız"];
const [, second, ...others] = songs;
console.log('form 2:', second, others);

// Form 3: swap two existing variables with an assignment pattern.
let color1 = 'Siyah';
let color2 = 'Beyaz';
[color1, color2] = [color2, color1];
console.log('form 3:', color1, color2);

// Form 4: defaults are used when elements are undefined or missing.
const [age = 20, score = 100] = [];
console.log('form 4:', age, score);
