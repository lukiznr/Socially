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
      className={`${showDialogClass} duration-[400ms] ease-[cubic-bezier(0, 0, 0, 1)] w-full z-50 overflow-auto fixed flex items-center justify-center`}
    >
      <div className="backDialog hidden z-40 overflow-auto fixed bg-black opacity-50"></div>
      <div className="z-50 flex flex-col w-11/12 sm:w-[480px] h-auto bg-surface-variant rounded-[28px]">
        <div className="flex flex-col gap-4 justify-start px-8 pt-8 pb-0">
          <h3 className="text-2xl font-normal">Basic dialog title</h3>
          <p className="text-sm tracking-[0.25px] leading-5">
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
