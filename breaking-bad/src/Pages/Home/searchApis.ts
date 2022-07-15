export const searchCharacter = (value: string) => {
  return fetch(`https://breakingbadapi.com/api/characters?name=${value}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
