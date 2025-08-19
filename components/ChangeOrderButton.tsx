interface Props {
  onClick: () => void;
}

export default function ChangeOrderButton({ onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-primary/60 p-2 text-background rounded-xl absolute top-0 right-0 z-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m3 16l4 4l4-4m-4 4V4m14 4l-4-4l-4 4m4-4v16"
          ></path>
        </svg>
      </button>
    </div>
  );
}
