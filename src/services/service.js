export const currentDay = (number) => {
  // Варто використати const замість let'ів де це можливо
  let today = new Date();
  let dd = today.getDate() + number;
  let mm = today.getMonth() + 1 ;
  let yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return `${dd}-${mm}-${yyyy}`;
};
