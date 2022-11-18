export const loginValidate = (login: string) => /[a-zA-Z0-9]{2,10}$/.test(login);
