import { FooterColumnData } from "../types";
import { FooterLinkItem } from "./FooterLinkItem";

interface Props {
  column: FooterColumnData;
}

export const FooterColumn = ({ column }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-[11px] font-black uppercase tracking-[0.25em] text-skorpion-white/30">
        {column.title}
      </span>
      <ul className="flex flex-col gap-3">
        {column.links.map((link) => (
          <li key={link.id}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
};
