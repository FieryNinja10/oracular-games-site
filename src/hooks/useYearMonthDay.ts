const useYearMonthDay = (date: Date) => {
  if (date === undefined) return "";
  const year = date.toLocaleDateString("default", { year: "numeric" });
  const month = date.toLocaleDateString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleDateString("default", { day: "2-digit" });

  return year + "-" + month + "-" + day;
};

export default useYearMonthDay;
