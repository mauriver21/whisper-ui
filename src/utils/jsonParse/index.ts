export const jsonParse = <T>(text: string): T | undefined => {
  let result;
  try {
    result = JSON.parse(text);
  } finally {
    return result;
  }
};
