// Name: Ahmet EZER
// Student Number: 2200008227
// React props and children with strict TypeScript.
import type { ReactNode, ComponentProps, PropsWithChildren } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
type CardProps = { title: string; children?: ReactNode };
function Card({ title, children }: CardProps) { return <section><h2>{title}</h2>{children}</section>; }
console.log(renderToStaticMarkup(<Card title="Hi">text</Card>));

// P1: the same single object, either accessed directly or destructured.
function CardA(props: CardProps) { return <section><h2>{props.title}</h2>{props.children}</section>; }
function CardB({ title, children }: CardProps) { return <section><h2>{title}</h2>{children}</section>; }
console.log('P1 A:', renderToStaticMarkup(<CardA title="Porsche">Taycan Turbo S</CardA>));
console.log('P1 B:', renderToStaticMarkup(<CardB title="Porsche">Taycan Turbo S</CardB>));

// P2: children is also a normal field in the props type.
console.log('P2 tags:', renderToStaticMarkup(<CardB title="Garage">Porsche</CardB>));
console.log('P2 prop:', renderToStaticMarkup(<CardB title="Garage" children="Porsche" />));

// P3: ReactNode admits text, numbers, JSX, arrays and empty values.
const childExamples: { label: string; content: ReactNode }[] = [
 { label: 'string', content: 'Porsche' }, { label: 'number', content: 952 },
 { label: 'element', content: <strong>Taycan</strong> },
 { label: 'multiple', content: [<span key="a">BMW</span>, <span key="b">TOGG</span>] },
 { label: 'undefined', content: undefined }, { label: 'null', content: null },
 { label: 'false', content: false }
];
for (const { label, content } of childExamples) {
 console.log('P3 ' + label + ':', renderToStaticMarkup(<CardB title="Garage">{content}</CardB>));
}
// Function is intentionally forced to ReactNode only to inspect React's runtime warning.
const childFunction = () => 'Porsche';
console.log('P3 function type:', typeof childFunction);
const functionAsChild = childFunction as unknown as ReactNode;
console.log('P3 function:', renderToStaticMarkup(<CardB title="Garage">{functionAsChild}</CardB>));

// P4: children and title are extracted, other DOM attributes are forwarded.
type SectionProps = { title: string; children?: ReactNode; id?: string; className?: string };
function GarageSection({ title, children, ...rest }: SectionProps) {
 return <section {...rest}><h2>{title}</h2>{children}</section>;
}
console.log('P4 rest:', renderToStaticMarkup(<GarageSection title="Cars" id="garage" className="cars">Porsche</GarageSection>));
function SpreadOrder(props: { id: string }) {
 const firstAttributes = { ...props, id: 'explicit' };
 const secondAttributes = Object.assign({ id: 'explicit' }, props);
 return <><section {...firstAttributes}>First</section><section {...secondAttributes}>Second</section></>;
}
console.log('P4 order:', renderToStaticMarkup(<SpreadOrder id="from-props" />));

// P5: named slots versus arbitrary children layout.
type LayoutProps = { header?: ReactNode; footer?: ReactNode; children?: ReactNode };
function Layout({ header, footer, children }: LayoutProps) {
 return <div><header>{header}</header><main>{children}</main><footer>{footer}</footer></div>;
}
console.log('P5 props:', renderToStaticMarkup(<Layout header="Garage" footer="2026">Porsche Taycan Turbo S</Layout>));
console.log('P5 children:', renderToStaticMarkup(<Layout><h2>Garage</h2><p>Porsche Taycan Turbo S</p><small>2026</small></Layout>));

// P6: null does not trigger a default; undefined does.
type LabelProps = { text?: string | null };
function CarLabel({ text = 'Unknown car' }: LabelProps) { return <span>{text}</span>; }
console.log('P6 undefined:', renderToStaticMarkup(<CarLabel text={undefined} />));
console.log('P6 null:', renderToStaticMarkup(<CarLabel text={null} />));

// P7: PropsWithChildren and intrinsic button props.
type PanelProps = PropsWithChildren<{ title: string }>;
function Panel({ title, children }: PanelProps) { return <section><h3>{title}</h3>{children}</section>; }
console.log('P7 panel:', renderToStaticMarkup(<Panel title="Garage">Porsche</Panel>));
type ButtonProps = ComponentProps<'button'>;
function CustomButton({ children, ...rest }: ButtonProps) { return <button {...rest}>{children}</button>; }
console.log('P7 button:', renderToStaticMarkup(<CustomButton type="button" disabled>Start</CustomButton>));
// These type-level checks become `false` if TS unexpectedly accepts either invalid type.
type RejectsStringDisabled = string extends ButtonProps['disabled'] ? false : true;
const rejectsStringDisabled: RejectsStringDisabled = true;
type RejectsFunctionChildren = (() => string) extends ReactNode ? false : true;
const rejectsFunctionChildren: RejectsFunctionChildren = true;
console.log('P7 rejects string disabled:', rejectsStringDisabled);
console.log('P7 rejects function children:', rejectsFunctionChildren);
