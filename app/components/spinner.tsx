import type { FC } from "react";
import { useNavigation } from "@remix-run/react";

type SpinnerProps = {
  color?: "blue" | "red" | "white" | "whiteOnly";
};

const Spinner: FC<SpinnerProps> = ({ color = "blue" }) => {
  const colorClass = {
    blue: "text-blue-500",
    red: "text-red-500",
    white: "text-white dark:text-black",
    whiteOnly: "text-white",
  };
  return (
    <div
      className={`animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent ${colorClass[color]} rounded-full bg-transparent`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const AutoSpinner: FC<SpinnerProps> = ({ color = "white" }) => {
  const navigation = useNavigation();
  return (
    <div
      className={`bg-black dark:bg-white bg-opacity-20 absolute z-50 inset-0 flex justify-center items-center${
        navigation.state !== "idle" ? "" : " hidden"
      }`}
    >
      <Spinner color={color} />
    </div>
  );
};

export const SpinnerTest = () => {
  return (
    <div className="relative">
      <AutoSpinner />
      <h1>Spinner</h1>
      <Spinner />
      <Spinner color="red" />
    </div>
  );
};

export default Spinner;
