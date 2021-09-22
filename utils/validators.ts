export const isExisted = (str?: string | number) => {
  // Boolean(0) va donner false donc on fait une condition spéciale
  if (str === 0) return true;
  return Boolean(str);
};

export const isAlphaNumeric = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^[a-zA-Z0-9_]+$/.test(String(str));
};

export const isNumeric = (str?: string | number) => {
  if (str === (undefined || null)) return false;
  return /^[0-9]+$/.test(String(str));
};

export const isEmail = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(str)
  );
};

// vérifie si la châine de caractères est un numéro de téléphone comportant 10 chiffres et commençant par 0
export const isPhoneNumber = (value: string) => {
  return /^0[0-9]{9}$/.test(value);
};
