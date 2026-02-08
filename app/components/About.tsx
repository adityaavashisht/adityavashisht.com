import Highlight from "./Hightlight";
import Image from "next/image";
import cover from "@/public/me.jpeg";

export default function About() {
  return (
    <section className="flex flex-col gap-y-8 text-sm">
      <div>
        <h1 className="text-saturated font-bold text-xl">Aditya Vashisht</h1>
        <span className="text-xs font-light">Based in Toronto.</span>
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
      <div className="bg-card p-2 rounded-md border border-decoration ">
        <div className="relative w-full aspect-video">
          <Image
            src={cover}
            alt="Aditya standing on a bridge"
            className="w-full shadow-md object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
            fill
            priority
            placeholder="blur"
          />
        </div>
      </div>
      <p>
        When I&apos;m not drowning in code, I&apos;m probably lifting weights, out
        on a trail or reading about rockets and space.
      </p>
    </section>
  );
}
