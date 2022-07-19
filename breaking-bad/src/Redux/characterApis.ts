export const getCharacterApi = () => {
  return fetch("https://www.breakingbadapi.com/api/characters").then((res) => {
    return res.json();
  });
};
