export const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(num);
};
