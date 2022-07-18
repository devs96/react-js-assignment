export const getCharacterApi = () => {
  return fetch("https://www.breakingbadapi.com/api/characters")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      // const temp: CharacterData[] = [];
      // response.forEach((e: CharacterData) => {
      //   temp.push({ ...e, isFav: false });
      // });
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
