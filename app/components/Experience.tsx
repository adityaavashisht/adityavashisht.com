import { data } from "../utils/data/work";

export default function Experience() {
  return (
    <section className="flex flex-col gap-y-6 ">
      <h2 className="font-semibold text-sm text-saturated">Work</h2>
      {data.map(({ company, role, startYear, endYear }, index) => (
        <div className="text-sm" key={index + 1}>
          <div>
            <span className="text-xs opacity-65">{role}</span>
          </div>
          <div className="flex items-center w-full">
            <span className="text-saturated">{company}</span>
            <span className="mx-4 h-px flex-1 bg-decoration" />
            <span className="opacity-65 text-xs whitespace-nowrap">
              {startYear} - {endYear}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
