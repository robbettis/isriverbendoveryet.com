export const pluralize = (count: number, singular: string, plural?: string) => {
  let word = "";

  if (count === 1) {
    word = singular;
  } else {
    word = plural || singular + "s";
  }

  return (count || 0) + " " + word;
};
