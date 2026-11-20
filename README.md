# Destructuring Field Guide

**Name:** Ahmet EZER  
**Student number:** 2200008227  
**Course:** SEN0415 Advanced Web Programming — Fall 2026  
**Bonuses claimed:** Bonus 1: LaTeX; Bonus 2: Depth; Bonus 3: Real code. Bonus 4: Git repository is pending until the actual repository and commit history exist.

## Bonus 1: LaTeX

The full field guide is also provided as `Destructuring_Field_Guide.tex` and `Destructuring_Field_Guide.pdf`. The `.tex` document was compiled twice using `xelatex` to resolve its table of contents:

```sh
xelatex -interaction=nonstopmode -halt-on-error Destructuring_Field_Guide.tex
xelatex -interaction=nonstopmode -halt-on-error Destructuring_Field_Guide.tex
```

The document uses `listings` for code, real `longtable` tables, and linked contents. The PDF is the guide itself, including the required sections and the bonus investigations.

## Run

The examples are in the instructor's `starter/` project. I used Node.js, npm, JavaScript, TypeScript strict mode, React, and `renderToStaticMarkup`.

```sh
npm install
npm run all
npm run check
```

I ran the JavaScript and TypeScript programs separately while developing them on my computer. The included `output.txt` is the actual earlier full terminal run; after saving Form 6–10 in `ts/objects.ts`, I reran that file and `npm run check` successfully. Before final submission, regenerate the full `output.txt` from the latest saved version. For the final output file, I ran the full project and redirected its output:

```powershell
npm run all > output.txt 2>&1
```

`npm run all` runs the files in `js/` and `ts/`; `npm run check` runs `tsc --noEmit`. My final run completed without a TypeScript error. `output.txt` should be taken from the final saved project, not typed from an expected result. The output excerpts below are from my actual runs as shown in the terminal; some long objects are abbreviated in the prose, but not in `output.txt`.

## How to read an entry

Each form below gives **Syntax**, a concrete **Example** from my files, **Output**, **Use it when**, and **Watch out**. Destructuring makes several bindings from an array or an object using a pattern on the left of `=`. For arrays, position matters; for objects, property names matter.

## Field guide

### Form 1 — Array destructuring from a function result

**Syntax:** `const [x, y] = f()`

**Example** (`js/arrays.mjs`):

```js
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)
```

**Output:** `form 1: 2 9`

**Use it when:** a function returns values with stable positions, such as the minimum and maximum. This is equivalent to getting the returned array first, then reading index 0 into `lowest` and index 1 into `highest`.

**Watch out:** `[highest, lowest]` would reverse which result goes into which variable. A missing array position produces `undefined`. In TypeScript the function return type is `[number, number]`, a tuple, rather than just `number[]`.

### Form 2 — Skip one array item and collect the rest

**Syntax:** `const [, second, ...others] = list`

**Example** (`js/arrays.mjs`):

```js
const songs = [
  'Eşik Taşı',
  'Senden İnsaf Diler Yarın',
  'Urfa Sana Küsmüş',
  'Biz Ne Ayrılıklar Görmüş Adamız'
];
const [, second, ...others] = songs;
console.log('form 2:', second, others);
```

**Output:** `form 2: Senden İnsaf Diler Yarın [ 'Urfa Sana Küsmüş', 'Biz Ne Ayrılıklar Görmüş Adamız' ]`

**Use it when:** I want a particular item and the remaining items, without repeatedly using array indexes. The first comma skips index 0, `second` receives index 1, and `others` receives a new array from index 2 onward.

**Watch out:** removing the leading comma would take the first song instead. `...others` in a destructuring **pattern** is *rest* (collect); `...songs` in an expression is *spread* (expand). Rest must appear last.

### Form 3 — Swap variables

**Syntax:** `[a, b] = [b, a]`

**Example** (`js/arrays.mjs`):

```js
let color1 = 'Siyah';
let color2 = 'Beyaz';
[color1, color2] = [color2, color1];
console.log('form 3:', color1, color2);
```

**Output:** `form 3: Beyaz Siyah`

**Use it when:** I need to exchange two existing values without creating a third named temporary variable. The right side is evaluated from the old values before assignment updates the variables.

**Watch out:** I must use `let` for bindings I plan to reassign. Starting an assignment with `[` directly after another line can sometimes interact with automatic semicolon insertion, so semicolons make the boundary clear.

### Form 4 — Default values in an array

**Syntax:** `const [a = 1, b = 2] = []`

**Example** (`js/arrays.mjs`):

```js
const [age = 20, score = 100] = [];
console.log('form 4:', age, score);
```

**Output:** `form 4: 20 100`

**Use it when:** some array positions are optional. It behaves like taking index 0 and index 1, then replacing an `undefined` result with the defaults.

**Watch out:** the default applies to `undefined`, including missing positions, but **not** to `null`. In `ts/arrays.ts`, I explicitly give the input an array type that permits `undefined` so strict TypeScript accepts this example.

### Form 5 — Object properties by name

**Syntax:** `const { title, status } = task`

**Example** (`js/objects.mjs`):

```js
const task = { id: 't1', title: 'Buy milk', status: 'todo' };
const { title, status } = task;
console.log('form 5:', title, status);
```

**Output:** `form 5: Buy milk todo`

**Use it when:** I need named fields of a task or options object. This is like `const title = task.title` and `const status = task.status`.

**Watch out:** object destructuring uses names, not property order. If a name is absent, the resulting binding is `undefined`. The starter provides this worked example.

### Form 6 — Rename a property while taking it

**Syntax:** `const { title: heading } = book`

**Example** (`js/objects.mjs`):

```js
const book = { title: 'JavaScript Guide', pages: 250 };
const { title: heading } = book;
console.log('form 6:', heading);
```

**Output:** `form 6: JavaScript Guide`

**Use it when:** the source property's name is inconvenient or conflicts with another variable. This reads `book.title`, but puts its value in the variable `heading`.

**Watch out:** this does **not** declare a variable named `title`. In TypeScript, the colon *inside a pattern* is still renaming, not a type declaration; the type annotation goes after the whole pattern.

### Form 7 — Default value in an object

**Syntax:** `const { priority = 'normal' } = homework`

**Example** (`js/objects.mjs`):

```js
const homework = { subject: 'Web Programming' };
const { priority = 'normal' } = homework;
console.log('form 7:', priority);
```

**Output:** `form 7: normal`

**Use it when:** reading optional configuration fields. This means `priority` gets `homework.priority`, except when that value is `undefined`, in which case it becomes `'normal'`.

**Watch out:** `null` does not activate the default. In TypeScript I give `priority` an optional field type (`priority?: string`) to make its possible absence explicit.

### Form 8 — Object rest properties

**Syntax:** `const { id, ...others } = car`

**Example** (`js/objects.mjs`):

```js
const car = {
  id: 1,
  brand: 'Porsche',
  model: 'Taycan Turbo S',
  color: 'Dolomite Silver Metallic'
};
const { id, ...others } = car;
console.log('form 8:', id, others);
```

**Output:**

```text
form 8: 1 {
  brand: 'Porsche',
  model: 'Taycan Turbo S',
  color: 'Dolomite Silver Metallic'
}
```

**Use it when:** separating an identifier from the rest of an object's fields, for example before passing the remaining values to another component.

**Watch out:** `others` is a *new outer object*, not a deep copy of nested objects. Rest `...others` collects properties, whereas spread `{ ...others }` expands properties into another object.

### Form 9 — Nested object and array patterns

**Syntax:** `const { owner: { name }, cars: [firstCar] } = garage`

**Example** (`js/objects.mjs`):

```js
const garage = {
  owner: { name: 'Ahmet EZER' },
  cars: ['Porsche Taycan Turbo S', 'Clio 4']
};
const { owner: { name }, cars: [firstCar] } = garage;
console.log('form 9:', name, firstCar);
```

**Output:** `form 9: Ahmet EZER Porsche Taycan Turbo S`

**Use it when:** I need a field inside another object and a particular element inside a contained array. This replaces separate reads such as `garage.owner.name` and `garage.cars[0]`.

**Watch out:** the nesting must exist. If `owner` is missing or `null`, attempting to take `name` throws; if `cars` is empty, `firstCar` can be `undefined`. My TS `Garage` type uses a nonempty tuple for `cars`.

### Form 10 — Computed property name

**Syntax:** `const { [key]: value } = student`

**Example** (`js/objects.mjs`):

```js
const student = {
  name: 'Ahmet EZER',
  department: 'Computer Engineering',
  grade: 150
};
const key = 'department';
const { [key]: value } = student;
console.log('form 10:', value);
```

**Output:** `form 10: Computer Engineering`

**Use it when:** the property I need is selected by another variable, instead of being written as a literal property name. This is equivalent to reading `student[key]`.

**Watch out:** the brackets are necessary. If the key does not exist, the value is `undefined`. In TypeScript, using a literal key type such as `'department'` helps the compiler know the result type.

### Form 11 — Destructuring in function parameters (plus 11b)

**Syntax:** `function f({ title, status = 'todo' } = {})` and `([brand, model]) => ...`

**Example** (`js/params.mjs`):

```js
function createTask({ title, status = 'todo' } = {}) {
  return { title, status };
}
console.log('form 11:', createTask({ title: 'Read' }));

const showCar = ([brand, model]) => `${brand} ${model}`;
console.log('form 11b:', showCar(['Porsche', 'Taycan Turbo S']));
```

**Output:**

```text
form 11: { title: 'Read', status: 'todo' }
form 11b: Porsche Taycan Turbo S
```

**Use it when:** a function receives an options object and I want its fields directly in local parameters, or a pair with a known order. The parameter pattern avoids writing `options.title` repeatedly.

**Watch out:** the inner `status = 'todo'` is a default for a **field**, while the outer `= {}` is the default for an **omitted argument**. In `ts/params.ts`, the annotation `: TaskInput` goes after the entire object pattern. For 11b, `[string, string]` describes the array parameter.

### Form 12 — Destructuring in loops

**Syntax:** `for (const [key, value] of Object.entries(obj))` and `for (const [key, value] of map)`

**Example** (`js/params.mjs`):

```js
const carSpecs = { Porsche: 952, TOGG: 435, Renault: 160 };
for (const [brand, horsepower] of Object.entries(carSpecs)) {
  console.log('form 12 object:', brand, horsepower, 'HP');
}
const carModels = new Map([
  ['Porsche', 'Taycan Turbo S'],
  ['TOGG', 'T10X 4More Obsidyen'],
  ['Renault', 'Clio 1.3 Tce']
]);
for (const [brand, model] of carModels) {
  console.log('form 12 map:', brand, model);
}
```

**Output:**

```text
form 12 object: Porsche 952 HP
form 12 object: TOGG 435 HP
form 12 object: Renault 160 HP
form 12 map: Porsche Taycan Turbo S
form 12 map: TOGG T10X 4More Obsidyen
form 12 map: Renault Clio 1.3 Tce
```

**Use it when:** walking over key/value pairs. `Object.entries` and `Map` both provide two-item entry arrays, which the loop pattern splits into separate bindings.

**Watch out:** a normal object and a `Map` have different APIs. The numeric horsepower values here are my example data, not measurements verified against vehicle specifications. In TypeScript, the `Map` is `Map<string, string>`.

## Pitfalls

These five experiments are in `js/pitfalls.mjs`. I preserved the original error cases and ran them in Node.js.

### Pitfall 1 — Destructuring `undefined` or `null` throws

```js
try {
  const { a } = undefined;
  console.log(a);
} catch (error) {
  console.log('pitfall 1:', error.constructor.name);
}
```

**Real output:** `pitfall 1: TypeError`  
**Why:** there is no object from which to read property `a`. `try/catch` lets the example continue instead of terminating the entire script. The same general problem occurs with `null`.

### Pitfall 2 — A default does not replace `null`

```js
const { color: color1 = 'Black' } = { color: undefined };
const { color: color2 = 'Black' } = { color: null };
console.log('pitfall 2:', color1, color2);
```

**Real output:** `pitfall 2: Black null`  
**Why:** defaults apply only when a destructured value is `undefined`. `null` is an explicitly supplied value, so it remains `null`.

### Pitfall 3 — Assignment to an existing object-pattern binding needs parentheses

```js
let carBrand = 'BMW';
const carInfo = { carBrand: 'Porsche' };
({ carBrand } = carInfo);
console.log('pitfall 3:', carBrand);
```

**Real output:** `pitfall 3: Porsche`  
**Why:** without parentheses, a leading `{` can be parsed as a block rather than an object assignment pattern. The parenthesized expression updates the existing variable.

### Pitfall 4 — Destructuring is not a deep copy

```js
const originalCar = {
  brand: 'Porsche',
  model: 'Taycan Turbo S',
  engine: { power: 761 }
};
const { engine } = originalCar;
engine.power = 952;
console.log('pitfall 4:', originalCar.engine.power, 'HP');
```

**Real output:** `pitfall 4: 952 HP`  
**Why:** `engine` and `originalCar.engine` refer to the **same nested object**. Changing one is visible through the other. The 761-to-952 change is a code experiment representing an imagined upgrade, not an actual vehicle modification.

### Pitfall 5 — Objects use names; arrays use positions

```js
const carDetails = { brand: 'Porsche', model: 'Taycan Turbo S' };
const { model, brand } = carDetails;
const carList = ['Porsche', 'Renault'];
const [firstCar, secondCar] = carList;
console.log('pitfall 5 object:', model, brand);
console.log('pitfall 5 array:', firstCar, secondCar);
```

**Real output:**

```text
pitfall 5 object: Taycan Turbo S Porsche
pitfall 5 array: Porsche Renault
```

**Why:** the object pattern can list `model` before `brand`; the properties still match by name. In the array pattern, swapping the variables' positions changes the values assigned to them.

## TypeScript topics T1–T5

I tested these in `ts/types.ts` with `strict` and `noUncheckedIndexedAccess` enabled.

### T1 — Rename versus annotation

`const { x: horizontal } = point` creates `horizontal`; `horizontal` is **not** a type. Writing `{ x: string }` in a pattern would rename `x` to a variable called `string`. The annotation goes **after** the complete pattern, as in `const { x: positionX }: { x: number } = coordinates`.

**Real output:** `T1: 1` and `T1 typed: 10`.

### T2 — Tuple and `as const`

A function returning `[number, string]` guarantees the two positions have specified types. `const carData = [952, 'Porsche Taycan Turbo S'] as const` instead infers a **readonly tuple with literal values**, so its positions are more specific than a mutable `number | string` array.

**Real output:** `T2 tuple: 952 Porsche Taycan Turbo S` and `T2 as const: 952 Porsche Taycan Turbo S`.

### T3 — `noUncheckedIndexedAccess`

With an ordinary `string[]`, `const [first] = cars` is `string | undefined` because the array may be empty. I check `first !== undefined` before using it as a guaranteed string; destructuring an empty array produces `undefined`.

**Real output:** `T3 first: Porsche` and `T3 missing: undefined`.

### T4 — Optional fields and defaults

Given `type CarOptions = { brand: string; color?: string }`, destructuring `{ color }` has type `string | undefined`. With `{ color: defaultColor = 'Black' }`, `defaultColor` has type `string`, because `undefined` is replaced by the default.

**Real output:** `T4 optional: undefined` and `T4 default: Black`.

### T5 — One compile-time error and its fix

The `Engine` type defines `power`, not `horsepower`. This deliberately invalid destructuring requires the allowed single suppression line in `ts/types.ts`:

```ts
type Engine = { power: number };
const engine: Engine = { power: 952 };
// @ts-expect-error: Property 'horsepower' does not exist on type 'Engine'.
const { horsepower: invalidPower } = engine;
const { power: validPower } = engine;
```

The compiler error being demonstrated is that **property `horsepower` does not exist on type `Engine`**. The correction is to destructure `power`. `@ts-expect-error` acknowledges the one intentional error so the rest of the project can pass strict checking. At runtime the invalid access yields `undefined`, while the corrected access yields `952`.

**Real output:** `T5 invalid property: undefined` and `T5 fixed: 952`.

## Props and children (P1–P7)

I ran `js/props.jsx` and `ts/props.tsx` with React's `renderToStaticMarkup`. A React function component receives **one props object**. JSX attributes become fields on that object; content between an opening and closing component tag normally becomes the special `children` prop. `children` is not a second positional argument.

### P1 — Props is one object

`function CardA(props)` uses `props.title` and `props.children`. `function CardB({ title, children })` destructures that same object in its parameter list. This is object destructuring (Form 5) applied in a function parameter (Form 11).

**Real JS output:**

```text
P1 A: <section><h2>Porsche</h2>Taycan Turbo S</section>
P1 B: <section><h2>Porsche</h2>Taycan Turbo S</section>
```

The HTML is identical: destructuring changes how the component reads props, not what JSX passes.

### P2 — Children is a prop

`<CardB title="Garage">Porsche</CardB>` and `<CardB title="Garage" children="Porsche" />` both give the component `children: 'Porsche'`.

**Real output:** both forms render `<section><h2>Garage</h2>Porsche</section>`. Usually the tag-content form is clearer for nested JSX. Explicit `children` is useful when I have a value already stored in a variable. If both are supplied, the compiled JSX's `children` assignment order decides the effective value, so I should not depend on writing both.

### P3 — What children can be

I rendered each value inside `<CardB title="Garage">...</CardB>`:

| Child value | Actual rendered behavior |
|---|---|
| String `'Porsche'` | Text `Porsche` |
| Number `952` | Text `952` |
| One element `<strong>Taycan</strong>` | `<strong>Taycan</strong>` |
| Array of two `<span>` elements | Both spans rendered in order |
| `undefined` | No additional content |
| `null` | No additional content |
| `false` | No additional content |
| A function | React warns and does not render it as regular child content |

**Real output example:**

```text
P3 multiple: <section><h2>Garage</h2><span>BMW</span><span>TOGG</span></section>
```

For `undefined`, `null`, and `false`, the HTML contains only the section and heading. The actual console warning began **“Functions are not valid as a React child.”** That warning matters: functions must be called, rendered as a component when appropriate, or passed as callback props, rather than supplied as ordinary children. TypeScript's `ReactNode` does not accept a function as a normal child; the TypeScript experiment uses a cast only to demonstrate the runtime warning.

### P4 — Separate children from the other props; spread order

`function GarageSection({ title, children, ...rest })` takes `title` and `children` separately while `rest` holds DOM attributes such as `id` and `className`. Passing `<section {...rest}>` forwards those remaining fields to the DOM element.

**Real output:**

```text
P4 rest: <section id="garage" class="cars"><h2>Cars</h2>Porsche</section>
```

The order of object spreads and explicit keys matters. I rendered one element from `{ ...props, id: 'explicit' }` and another from `{ id: 'explicit', ...props }` (in the TS version I used `Object.assign` for the second case to avoid TS2783). With `props.id = 'from-props'`:

```text
P4 order: <section id="explicit">First</section><section id="from-props">Second</section>
```

The **later** property assignment wins. This is expression spread, not destructuring rest.

### P5 — Header/footer props or children?

I built a `Layout` with `header`, `footer`, and `children`. With separate named props, the HTML has content in semantic `<header>` and `<footer>` positions. When I pass all content as children, the header/footer wrappers remain empty and everything goes into `<main>`.

**Real outputs:**

```text
P5 props: <div><header>Garage</header><main>Porsche Taycan Turbo S</main><footer>2026</footer></div>
P5 children: <div><header></header><main><h2>Garage</h2><p>Porsche Taycan Turbo S</p><small>2026</small></main><footer></footer></div>
```

I would choose named `header`/`footer` props when the component owns several fixed layout regions, and plain children when it just wraps arbitrary main content. They express different component APIs, not just two spellings of the same thing.

### P6 — Defaults in React props

For `function CarLabel({ text = 'Unknown car' })`, giving `text={undefined}` activates the default; giving `text={null}` does not.

**Real output:**

```text
P6 undefined: <span>Unknown car</span>
P6 null: <span></span>
```

This is the same `undefined`-versus-`null` rule as Form 7 and Pitfall 2. `null` is rendered as no text in this case.

### P7 — Children and DOM prop types

In TypeScript, `children?: ReactNode` permits strings, numbers, valid React elements, arrays of renderable nodes, and empty values such as `null`/`undefined`/booleans. `PropsWithChildren<{ title: string }>` adds an optional React `children` field to my own prop type. `ComponentProps<'button'>` derives the accepted props for a native HTML button, including `disabled?: boolean`.

**Real TS output:**

```text
P7 panel: <section><h3>Garage</h3>Porsche</section>
P7 button: <button type="button" disabled="">Start</button>
P7 rejects string disabled: true
P7 rejects function children: true
```

The `true` lines come from compile-time conditional type checks in my code. A string assigned to the button's `disabled` field, or a function supplied as an ordinary `ReactNode`, is rejected by TypeScript. Plain JavaScript has no such static check, so I also tried a string-valued `disabled` prop; React still rendered a disabled button. That is why the TypeScript component contracts matter.

## JavaScript vs TypeScript

Destructuring **syntax and runtime behavior are mostly the same**. TypeScript adds static checks that describe which values may appear. These are examples from my files, not new runtime rules.

| Form/topic | What stays the same | What TypeScript adds | Error / issue when wrong |
|---|---|---|---|
| 1: Function result | `[lowest, highest]` reads positions | Return tuple `[number, number]` | An incompatible tuple element type fails assignment/checking |
| 2: Skip + rest | `[, second, ...others]` works identically | `songs: string[]`; `second` may be `undefined` with unchecked-index protection | Treating a possibly absent `second` as definitely `string` fails strict checking |
| 3: Swap | `[a, b] = [b, a]` swaps values | Variables have compatible declared/inferred types | Swapping a `number` into a `string` variable is a type error |
| 4: Array defaults | Defaults replace `undefined` | Type array items as `number \| undefined` | Declaring incompatible default types or ignoring a possible missing index fails checking |
| 5: Object fields | `{ title, status }` reads named fields | `Task` type describes valid status strings | A status outside `'todo' \| 'in-progress' \| 'done'` is rejected |
| 6: Rename | `{ title: heading }` renames | Annotate the **whole** pattern/object, not `heading` inside braces | `{ title: string }` is a rename, not a type annotation |
| 7: Object default | `{ priority = 'normal' }` | `priority?: string` describes omission | A required property missing from a typed object triggers an error |
| 8: Object rest | `{ id, ...others }` collects remaining fields | `Car` type preserves the fields' types | Accessing nonexistent fields on `others` fails static checking |
| 9: Nested pattern | `owner.name`, `cars[0]` extracted by shape | Nested `Garage` type and nonempty tuple for cars | Missing/wrong nested shape gives a compile error; null at runtime still needs care |
| 10: Computed key | `{ [key]: value }` uses a variable | Narrow key to `'department'` or `keyof Student` | Arbitrary `string` cannot safely index a type with only fixed keys |
| 11/11b: Parameters | Patterns destructure passed arguments | `TaskInput` after pattern; tuple `[string, string]` for array arg | Wrong argument shape/types are rejected |
| 12: Loops | `[key, value]` splits each entry | Types for `CarSpecs` and `Map<string, string>` | Using a map value as a number when it is a string is rejected |
| T3: Missing index | Missing array slot is `undefined` | `noUncheckedIndexedAccess` includes `undefined` in the type | Using it as definitely present without a guard fails strict checking |
| P7: Button props | Props object and JSX syntax still work | `ReactNode`, `PropsWithChildren`, `ComponentProps<'button'>` | Function children and invalid `disabled` value types are rejected |

A TypeScript type does not automatically protect runtime data. `T5` deliberately showed an invalid property producing `undefined` at runtime even though the compiler would normally reject it.

## My own log

These are issues and surprises from the actual work shown in my runs and development. I did not invent extra compiler errors to fill this section.

1. **I thought object/array examples were finished, but the TypeScript objects were not saved.** The first full `npm run all` printed only `form 5` from `ts/objects.ts`, even though I had worked on Forms 6–10. I used **Save All**, ran `npx tsx ts/objects.ts` again, and then saw Forms 5–10. **Lesson:** a successful command may still run an older saved version; I have to save everything first.

2. **Spread order produced a TypeScript compiler error.** My original TS P4 version wrote an explicit `id` before `{...props}`. The compiler reported `TS2783: 'id' is specified more than once, so this usage will be overwritten.` I reworked the example into composed attribute objects and used `Object.assign` for the `id`-then-props case. The next `npm run check` passed. **Lesson:** TS can catch a predictable overwrite before runtime; the last assigned property still wins.

3. **A function supplied as children did not appear on screen.** React printed the warning beginning `Functions are not valid as a React child.` The resulting HTML had the heading but no function content. **Lesson:** a function value is not ordinary rendered `children`; I need to call it or use it correctly as a component/callback.

4. **`undefined` and `null` looked similar but behaved differently.** My Pitfall 2 output was `Black null`. In P6, `undefined` displayed `Unknown car` while `null` rendered an empty span. **Lesson:** defaults are triggered by `undefined`, not every missing-looking value.

5. **Destructuring a nested object did not make an independent engine.** When I changed `engine.power` from 761 to 952, the original car reported `952 HP`. **Lesson:** I only copied the reference to the nested object; I did not create a deep clone.

6. **TypeScript did not change what happens for a nonexistent runtime property.** In T5 I intentionally used the permitted `@ts-expect-error` line to show a wrong property name. My actual output was `T5 invalid property: undefined` and `T5 fixed: 952`. **Lesson:** compile-time type errors and runtime values are different things; I should fix the property name rather than routinely suppress errors.

7. **The first npm installation had an install-script warning.** npm noted `esbuild`'s postinstall script had not yet been approved under its install-scripts policy, but `npm run all` and the TypeScript check still ran successfully on my machine. **Lesson:** I should distinguish warnings from fatal errors and confirm by actually running the project.

## Final checks

- All 12 forms are represented in JavaScript and TypeScript; Form 11b is included as an additional parameter-pattern experiment.
- `js/pitfalls.mjs` has five runnable pitfall cases.
- `ts/types.ts` includes T1–T5 with only the allowed T5 `@ts-expect-error`.
- `js/props.jsx` and `ts/props.tsx` cover P1–P7 and produce server-rendered HTML.
- `npm run all` and `npm run check` ran successfully after saving the files.
- `output.txt` is generated from the final run and belongs in the submitted project ZIP together with this `README.md`, the source files, and project configuration.


# Bonus 2: Depth

I tested additional destructuring behaviors using `bonus2-depth.mjs`. The attached `bonus2-output.txt` was captured from running `node bonus2-depth.mjs` with Node.js 22.16.0. To repeat the experiment inside the project: `node bonus2-depth.mjs`.

## Experiment 1: Array patterns work on iterables, not just arrays

```js
const [letter1, letter2, ...remainingLetters] = 'PORSCHE';
const [firstSet, ...restSet] = new Set(['Porsche', 'TOGG', 'Porsche', 'Renault']);
```

**Real output:** `1 string: P O RSCHE` and `1 set: Porsche [ 'TOGG', 'Renault' ]`.

**Why:** An array destructuring pattern obtains an iterator from the value. A string yields characters, while a `Set` yields its insertion-ordered distinct values; the duplicate Porsche disappears. This explains why an array *pattern* can consume values that are not actual arrays.

## Experiment 2: Generators supply values lazily

```js
function* modelGenerator() { yield 'Taycan'; yield 'M4'; yield 'Clio'; }
const [firstModel, secondModel, ...otherModels] = modelGenerator();
```

**Real output:** `2 generator: Taycan M4 [ 'Clio' ]`.

**Why:** Each destructured position requests the next generator value. The rest binding consumes the remaining values into an ordinary array. A generator can even be infinite, so unbounded rest collection must be avoided.

## Experiment 3: Defaults are lazy, and later defaults can read earlier bindings

```js
let defaultCallCount = 0;
function defaultPower() { defaultCallCount++; return 952; }
const [powerDefined = defaultPower()] = [761];
const [powerMissing = defaultPower()] = [];
const [basePower = 761, tunedPower = basePower + 191] = [];
```

**Real output:** `3 defaults: 761 952 calls: 1` and `3 previous binding: 761 952`.

**Why:** A default expression runs only when the corresponding source is `undefined`, so `defaultPower()` is called once, not twice. Initializers execute left to right; a later default can use `basePower`, which is already initialized. Reversing such dependencies can cause a temporal-dead-zone error.

## Experiment 4: Other contexts and existing assignment targets

```js
try { throw new Error('Missing car specification'); }
catch ({ message }) { console.log('4 catch:', message); }
const car = { brand: 'Renault', power: 130 };
[car.brand, car.power] = ['Renault', 160];
let tunedBrand = '', tunedPowerValue = 0;
({ brand: tunedBrand, power: tunedPowerValue } = car);
```

**Real output:** `4 catch: Missing car specification` and `4 assignment targets: Renault 160`.

**Why:** `catch` can destructure an Error's `message` property. In an assignment pattern, targets may be existing property references such as `car.power`, not just new variables. Parentheses are necessary when an object assignment statement starts with `{`.

## Experiment 5: Default side effects and a readability refactor

```js
let sideEffects = 0;
const defaults = { first: undefined, second: 12 };
const { first: firstDefault = (++sideEffects), second: secondDefault = (++sideEffects) } = defaults;
const full = { garage: { owner: { name: 'Ahmet' }, cars: ['Taycan', 'Clio'] } };
const { garage: { owner: { name: complexName }, cars: [complexFirstCar] } } = full;
const garage = full.garage;
const readableName = garage.owner.name;
const readableCar = garage.cars[0];
```

**Real output:** `5 lazy object defaults: 1 12 calls: 1`, `5 deep: Ahmet Taycan`, and `5 refactored: Ahmet Taycan`.

**Why:** The second field has a real value and does not evaluate its default; only one `++sideEffects` runs. The deeply nested destructuring is compact, but makes it hard to find which path can be missing. The refactor gives intermediate objects clear names and makes debugging simpler. On complex or untrusted input, the explicit reads with checks can be better than a large pattern.

# Bonus 3: Real code

I inspected the **Assignment 3 Task Manager source provided for this project** and a separately installed **TypeScript 5.8.3 library source**. The exact original files from Assignment 3 used in this analysis are preserved under `bonus3-source-evidence/assignment3/src/` for independent checking. The TypeScript source excerpt with original line numbers is `bonus3-source-evidence/typescript-mapEntries.txt`. Lines below refer to those unmodified files.

## Case 1 — React state tuple, Assignment 3 `src/App.tsx:50`

**Actual code:** `const [state, dispatch] = useReducer(taskReducer, initialState)`.

**Form:** Form 1 (array by position, function return). **Without destructuring:** `const pair = useReducer(taskReducer, initialState); const state = pair[0]; const dispatch = pair[1];`.

**Analysis:** React returns a pair: current state and dispatch function. The named bindings make their different roles clear. Their order is essential; swapping them would make code attempt to call the state as a function.

## Case 2 — React component parameter, Assignment 3 `src/TaskRow.tsx:5`

**Actual code:** `export default function TaskRow({ task, onNext, onDelete }: TaskRowProps)`.

**Form:** Form 11 (object destructuring in parameters), also Form 5 and React P1. **Without destructuring:** `function TaskRow(props: TaskRowProps) { const task = props.task; const onNext = props.onNext; const onDelete = props.onDelete; ... }`.

**Props vs children:** `task` is a task-data prop; `onNext` and `onDelete` are callback props. In this component, there is **no children prop** and `<TaskRow ... />` is self-closing. `key` used at its call site in `App.tsx:43` is special React metadata, not an ordinary readable prop.

## Case 3 — AddForm parameter, Assignment 3 `src/App.tsx:9`

**Actual code:** `function AddForm({ dispatch }: { dispatch: Dispatch<Action> })`.

**Form:** Form 11 (parameter object), including a TypeScript annotation after the pattern. **Without destructuring:** `function AddForm(props: {dispatch: Dispatch<Action>}) { const dispatch = props.dispatch; ... }`.

**Analysis:** The annotation applies to the complete object shape, not to `dispatch` as a renaming operation. The short pattern is helpful because this component needs only one prop.

## Case 4 — FilterBar parameter, Assignment 3 `src/App.tsx:25-27`

**Actual code:** `function FilterBar({ filter, counts, dispatch }: { filter: Filter; counts: Record<Filter, number>; dispatch: Dispatch<Action> })`.

**Form:** Form 11. **Without destructuring:** `function FilterBar(props: FilterBarProps) { const filter = props.filter; const counts = props.counts; const dispatch = props.dispatch; ... }` (with `FilterBarProps` matching the original shape).

**Readability criticism (required):** This is a case where destructuring can make the code **worse**: a long, multi-line inline type combined with three extracted names makes the signature difficult to scan. I would introduce a named `FilterBarProps` type and write `function FilterBar(props: FilterBarProps)`, then read `props.filter`, `props.counts`, and `props.dispatch` where needed, or keep the pattern but use the named type. This is not a correctness bug; it is a maintainability tradeoff.

## Case 5 — TaskList parameter, Assignment 3 `src/App.tsx:40`

**Actual code:** `function TaskList({ tasks, dispatch }: { tasks: Task[]; dispatch: Dispatch<Action> })`.

**Form:** Form 11. **Without destructuring:** `function TaskList(props: {tasks: Task[]; dispatch: Dispatch<Action>}) { const tasks = props.tasks; const dispatch = props.dispatch; ... }`.

**Analysis:** The props contain the task list and a callback dispatcher. `children` is not declared or consumed; the returned `<ul>` is the component's **output**, not an incoming `children` prop.

## Case 6 — Independently installed library, TypeScript 5.8.3 `lib/typescript.js:2679`

**Actual code:** `const [newKey, newValue] = f(key, value);` within `mapEntries` (context copied in `bonus3-source-evidence/typescript-mapEntries.txt`).

**Form:** Form 1 (array pair returned by a function). **Without destructuring:** `const mapped = f(key, value); const newKey = mapped[0]; const newValue = mapped[1];`.

**Analysis:** A mapper generates a key/value pair for insertion into a new `Map`. Destructuring is readable here because the two outputs are immediately used together. This is from a real installed open-source compiler package, not an invented tutorial example. It is independent of the Assignment 3 Task Manager.

## Bonus 3 conclusion

Across these examples, destructuring is useful for React's fixed-position tuple results and short component props, but a complex parameter pattern mixed with long inline types can reduce clarity. The five Assignment 3 cases and the installed-library case have exact filenames, line numbers, form classifications, non-destructured equivalents, and analysis. Their source evidence is included with this project.

# Bonus 4: Git repository (complete this after uploading)

The GitHub or GitLab repository URL and a real commit history must be added **after** they have actually been created. Bonus 4 is **not claimed** until that is done. See `GITHUB_FINAL_STEP.md`. I have not invented or backdated commits.
