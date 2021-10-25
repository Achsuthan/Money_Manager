const getDate = (dateString) => {
  const date = new Date(dateString); // 2009-11-10
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  return month + " " + day;
};

module.exports = {
  getDate: getDate,
};
