import type { FC } from "react";

type DialogType = {
  show: boolean;
};
const Dialog: FC<DialogType> = ({ show }) => {
  const showDialogClass = show
    ? "opacity-100 h-full inset-0"
    : "opacity-0 h-0 left-0 top-0";
  return (
    <div
      className={`${showDialogClass} ease-[cubic-bezier(0, 0, 0, 1)] fixed z-50 flex w-full items-center justify-center overflow-auto duration-[400ms]`}
    >
      <div className="backDialog fixed z-40 hidden overflow-auto bg-black opacity-50"></div>
      <div className="bg-surface-variant z-50 flex h-auto w-11/12 flex-col rounded-[28px] sm:w-[480px]">
        <div className="flex flex-col justify-start gap-4 px-8 pb-0 pt-8">
          <h3 className="text-2xl font-normal">Basic dialog title</h3>
          <p className="text-sm leading-5 tracking-[0.25px]">
            A dialog is a type of modal window that appears in front of app
            content to provide critical information, or prompt for a decision to
            be made.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
