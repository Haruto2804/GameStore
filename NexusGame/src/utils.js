/* eslint-disable no-useless-escape */
export const validators = {
  username: (val) => /^[a-zA-Z0-9_]{2,20}$/.test(val),

  email: (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,50})+$/.test(val),

  password: (val) => val.length >= 6 && val.length <= 50,
  
  displayName: (val) => val && val.length >= 6 && val.length <= 50,
}

export const formatDateString = (isoString) => {
  if (!isoString) return "Chưa cập nhật";
  
  const date = new Date(isoString);
  
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};