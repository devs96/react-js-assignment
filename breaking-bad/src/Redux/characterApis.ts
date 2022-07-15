import { CharacterData } from "../Pages/Home";

export const getCharacterApi = () => {
  return fetch("https://www.breakingbadapi.com/api/characters")
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      const temp: CharacterData[] = [];
      response.forEach((e: CharacterData) => {
        temp.push({ ...e, isFav: false });
      });
      return temp;
    })
    .catch((err) => {
      console.log(err);
    });
};
