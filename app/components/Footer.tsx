import { Suspense } from "react";
import LastVistor from "./LastVisitor";

function ArrowIcon() {
  return (
    <svg
      width="10"
      height="10a"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const socials = [
    {
      title: "Github",
      url: "https://github.com/adityaavashisht",
    },
    {
      title: "Twitter",
      url: "https://twitter.com/vashishtaditya_",
    },
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/in/adityavashisht/",
    },
    {
      title: "Resume",
      url: "/resume.pdf",
    },
  ];
  return (
    <footer className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <p className="font-semibold text-sm text-saturated">Socials</p>
        <ul className="text-sm flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 text-foreground">
          {socials.map(({ title, url }) => (
            <li key={title}>
              <a
                className="flex items-center"
                rel="noopener noreferrer"
                target="_blank"
                href={url}
                download={title === "Resume"}
              >
                <ArrowIcon />
                <p className="ml-2 underline decoration-decoration hover:text-saturated transition-all underline-offset-4">
                  {title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-xs font-extralight flex flex-col gap-y-1">
        <p>
          Built using
          <a
            className="font-light ml-1 underline decoration-foreground hover:text-saturated transition-all"
            href="https://nextjs.org/"
          >
            Next.js
          </a>
        </p>

        <span className="flex items-center gap-x-1">
          <p>Current visitor from:</p>
          <Suspense
            fallback={
              <span className="w-20 h-3 bg-decoration animate-pulse rounded-md" />
            }
          >
            <p className="font-light">
              <LastVistor />
            </p>
          </Suspense>
        </span>
      </div>
    </footer>
  );
}
