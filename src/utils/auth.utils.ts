import Cookies from "js-cookie";

export const setTokensCookies = (
  access_token: string,
  refresh_token: string
) => {
  Cookies.set("access_token", access_token, { secure: true });
  Cookies.set("refresh_token", refresh_token, {
    secure: true,
  });
};
