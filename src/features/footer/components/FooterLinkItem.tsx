import Link from "next/link";
import { FooterLink } from "../types";

interface Props {
  link: FooterLink;
}

export const FooterLinkItem = ({ link }: Props) => {
  const className = "text-white/50 text-sm font-bold hover:text-white transition-colors duration-200";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
};