export default function Loader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <svg className="circular-loader relative h-[100px] w-[100px]">
        <circle
          className="path stroke-primary"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeMiterlimit="10"
        ></circle>
      </svg>
    </div>
  );
}
