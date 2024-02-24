import { CustomBoolean } from "../../types";

type navbarTheme = {
  base: string;
  rounded: CustomBoolean;
  bordered: CustomBoolean;
  inner: {
    base: string;
    fluid: CustomBoolean;
  };
  brand: string;
  collapse: {
    base: string;
    list: string;
    hidden: CustomBoolean;
  };
  link: {
    base: string;
    active: CustomBoolean;
    disabled: CustomBoolean;
  };
  toggle: {
    base: string;
    icon: string;
  };
};
export const theme: navbarTheme = {
  base: "border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
  rounded: {
    on: "rounded",
    off: "",
  },
  bordered: {
    on: "border",
    off: "",
  },
  inner: {
    base: "mx-auto flex flex-wrap items-center justify-start",
    fluid: {
      on: "",
      off: "container",
    },
  },
  brand: "flex items-center",
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-s-0 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-1 px-2 lg:px-4 rounded-lg hover:!bg-blue-50 dark:hover:!bg-gray-700 duration-300",
    active: {
      on: "!bg-blue-100 dark:!bg-gray-700 dark:!text-white hover:!bg-blue-100 border-b-2 border-blue-200 text-white dark:text-white md:bg-transparent md:text-blue-700",
      off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};
