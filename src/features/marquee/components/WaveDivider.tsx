interface Props {
  tone?: "white" | "black" | "red";
}

const toneClass: Record<NonNullable<Props["tone"]>, string> = {
  white: "text-skorpion-white",
  black: "text-skorpion-black",
  red: "text-skorpion-red",
};

export const WaveDivider = ({ tone = "white" }: Props) => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-14 overflow-hidden sm:h-24">
      <svg
        className={`wave-divider -ml-[10%] h-full w-[120%] ${toneClass[tone]}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,0 L1440,64 C1200,104 1040,16 720,52 C400,86 240,108 0,56 Z"
        />
      </svg>
    </div>
  );
};
