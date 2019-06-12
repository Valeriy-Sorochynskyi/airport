/*
* 1 - якщо використовуєш async/await, то огортай його в try/catch блок і відловлюй невдалі реквести, для чого зазвичай створюється окрем redux action
* 2 - інформацію, таку як http адреса і route'и, варто виносити в окремі файли і зберігати як константи, аби уникнути помилок через опечатки
* */
export const getData = async date => {
  const response = await fetch(`https://api.iev.aero/api/flights/${date}`);
  const data = await response.json();
  return data.body;
};
