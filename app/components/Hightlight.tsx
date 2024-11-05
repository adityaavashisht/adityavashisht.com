interface Props {
  children: string;
}
export default function Highlight({ children }: Props) {
  return <span className="text-saturated">{children}</span>;
}
