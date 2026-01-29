/* eslint-disable no-useless-escape */
export const validators = {
  username: (val) => /^[a-zA-Z0-9_]{2,20}$/.test(val),

  email: (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,50})+$/.test(val),

  password: (val) => val.length >= 6 && val.length <= 50,
}
