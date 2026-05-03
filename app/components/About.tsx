import Highlight from "./Hightlight";

export default function About() {
  return (
    <section className="flex flex-col gap-y-8 text-sm">
      <div>
        <h1 className="text-saturated font-bold text-xl">Aditya Vashisht</h1>
        <span className="text-xs font-light opacity-65">Based in Toronto.</span>
      </div>
      <p>
        I&apos;m a developer at Accenture, crafting meaningful
        web experiences through cutting-edge tech and modern engineering.
      </p>
      <p>
        These days, I&apos;ve been neck-deep in <Highlight>AI SDK</Highlight>{" "}
        (so, of course, <Highlight>LLMs</Highlight>), along with <Highlight>Next.js</Highlight>{" "}
        and <Highlight>TypeScript</Highlight>, and not to forget, <Highlight>NestJS</Highlight> too.
       </p>
      <p>
        When I&apos;m not drowning in code, I&apos;m probably lifting weights, out
        on a trail or reading about rockets and space.
      </p>
    </section>
  );
}
