export const getCharacterApi = () => {
  return fetch("https://www.breakingbadapi.com/api/characters")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
