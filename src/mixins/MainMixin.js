export const validatePhone = (phone) => {
  if (phone) {
    phone = phone.toString().replace(/\D/g, "");
    const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      phone = `(${match[1]}${match[2] ? "" : ""}) ${match[2]}${
        match[3] ? "-" : ""
      }${match[3]}`;
    }
  }
  return phone;
};

export const formatDate = (d) => {
  const date = new Date(d)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
