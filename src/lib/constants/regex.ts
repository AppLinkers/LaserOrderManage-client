export const emailRegex = new RegExp(
  /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/,
);

export const passwordRegex = new RegExp(
  /^(?=.*[a-zA-Z])(?=.*[~`!@#$%^&*()-])(?=.*[0-9]).{8,}$/,
);

export const numberRegex = new RegExp(/\D/g);

export const decimalNumberRegex = new RegExp(/[^\d.]/g);

export const phoneRegex = new RegExp(/^\d{3}\d{3,4}\d{4}$/);
