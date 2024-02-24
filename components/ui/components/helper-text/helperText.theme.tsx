import { HelperColors } from "./HelperText";

type HelperTextTheme = {
  base: string;
  colors: HelperColors;
};

export const theme: HelperTextTheme = {
  base: "mt-1 text-xs",
  colors: {
    gray: "text-gray-500 dark:text-gray-400",
    info: "text-blue-700 dark:text-blue-800",
    success: "text-green-600 dark:text-green-500",
    failure: "text-red-600 dark:text-red-500",
    warning: "text-yellow-500 dark:text-yellow-600",
  },
};
