export const realNumber = (input: any) => {
  if (typeof input === "string") {
    return Number(input.replace(/,/g, ""));
  }
  return input;
};
