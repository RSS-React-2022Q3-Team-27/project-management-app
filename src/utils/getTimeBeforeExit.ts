import jwtDecode from 'jwt-decode';

export interface IToken {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const getTimeBeforeExit = (token: string) => {
  const decryptedToken = token && (jwtDecode(token) as IToken);
  return decryptedToken && Math.ceil(+((decryptedToken.exp - Date.now() / 1000) * 1000).toFixed(2));
};
