// Name: Ahmet EZER
// Student Number: 2200008227
// Props and children in JSX; all examples are server-rendered.
import { renderToStaticMarkup } from 'react-dom/server';

// P1: Props is one object; the second form is Form 5 inside Form 11.
function CardA(props) { return <section><h2>{props.title}</h2>{props.children}</section>; }
function CardB({ title, children }) { return <section><h2>{title}</h2>{children}</section>; }
console.log('A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>));
console.log('B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>));
console.log('P1 A:', renderToStaticMarkup(<CardA title="Porsche">Taycan Turbo S</CardA>));
console.log('P1 B:', renderToStaticMarkup(<CardB title="Porsche">Taycan Turbo S</CardB>));

// P2: A tag's enclosed content and an explicit children prop render alike.
console.log('P2 tags:', renderToStaticMarkup(<CardB title="Garage">Porsche</CardB>));
console.log('P2 prop:', renderToStaticMarkup(<CardB title="Garage" children="Porsche" />));

// P3: text, number, element, element array, undefined, null, false, function.
const childExamples = [
  ['string', 'Porsche'], ['number', 952], ['element', <strong>Taycan</strong>],
  ['multiple', [<span key="a">BMW</span>, <span key="b">TOGG</span>]],
  ['undefined', undefined], ['null', null], ['false', false]
];
for (const [label, content] of childExamples) {
  console.log('P3 ' + label + ':', renderToStaticMarkup(<CardB title="Garage">{content}</CardB>));
}
const childFunction = () => 'Porsche';
console.log('P3 function type:', typeof childFunction);
console.log('P3 function:', renderToStaticMarkup(<CardB title="Garage">{childFunction}</CardB>));

// P4: remove children/title from the other props, then forward the rest.
function GarageSection({ title, children, ...rest }) {
  return <section {...rest}><h2>{title}</h2>{children}</section>;
}
console.log('P4 rest:', renderToStaticMarkup(<GarageSection title="Cars" id="garage" className="cars">Porsche</GarageSection>));
function SpreadOrder(props) {
  return <><section {...props} id="explicit">First</section><section id="explicit" {...props}>Second</section></>;
}
console.log('P4 order:', renderToStaticMarkup(<SpreadOrder id="from-props" />));

// P5: separate named slots (header/footer props) versus freely structured children.
function Layout({ header, footer, children }) {
  return <div><header>{header}</header><main>{children}</main><footer>{footer}</footer></div>;
}
console.log('P5 props:', renderToStaticMarkup(<Layout header="Garage" footer="2026">Porsche Taycan Turbo S</Layout>));
console.log('P5 children:', renderToStaticMarkup(<Layout><h2>Garage</h2><p>Porsche Taycan Turbo S</p><small>2026</small></Layout>));

// P6: only undefined triggers an initializer; null becomes an empty text node.
function CarLabel({ text = 'Unknown car' }) { return <span>{text}</span>; }
console.log('P6 undefined:', renderToStaticMarkup(<CarLabel text={undefined} />));
console.log('P6 null:', renderToStaticMarkup(<CarLabel text={null} />));

// P7: JS accepts invalid prop types without compile-time checking.
function CustomButton({ children, ...rest }) { return <button {...rest}>{children}</button>; }
console.log('P7 button:', renderToStaticMarkup(<CustomButton type="button" disabled>Start</CustomButton>));
console.log('P7 invalid prop:', renderToStaticMarkup(<CustomButton type="button" disabled="wrong">Start</CustomButton>));
