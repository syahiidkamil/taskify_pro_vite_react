import Cookies from "js-cookie";

export const setTokensCookies = (
  access_token: string,
  refresh_token?: string
) => {
  Cookies.set("access_token", access_token, { secure: true });
  if (refresh_token) {
    Cookies.set("refresh_token", refresh_token, {
      secure: true,
    });
  }
};

export const deleteTokensCookies = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};

export const getIsUserAuthenticated = (): boolean => {
  return !!Cookies.get("access_token");
};
