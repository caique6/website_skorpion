interface Props {
  text: string;
  className?: string;
}

export const ShineText = ({ text, className }: Props) => {
  return (
    <span className="relative inline-block">
      <span className={className}>{text}</span>
      <span aria-hidden className="hero-shine">
        {text}
      </span>
    </span>
  );
};
