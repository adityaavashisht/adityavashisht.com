import { data } from "../utils/data/work";

export default function Experience() {
  return (
    <section className="flex flex-col gap-y-6 ">
      <h2 className="font-semibold text-sm text-saturated">Work</h2>
      {data.map(({ company, role, startYear, endYear, description }, index) => (
        <div className="text-sm" key={index + 1}>
          <div>
            <span className="text-xs opacity-65">{role}</span>
          </div>
          <span className="text-saturated">{company}</span>
          <span className="ml-2 opacity-65 text-xs">
            {startYear} - {endYear}
          </span>
          <p className="">{description}</p>
        </div>
      ))}
    </section>
  );
}
