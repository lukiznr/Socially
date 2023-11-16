export default function Loader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg className="circular-loader relative w-[100px] h-[100px]">
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
