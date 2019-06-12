export const getData = async date => {
  const response = await fetch(`https://api.iev.aero/api/flights/${date}`);
  const data = await response.json();
  return data.body;
};
