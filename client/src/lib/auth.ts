import { User } from "../types/auth";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
}


export const decodeJWT = (): User | null => {
    const token = getCookie("token");
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};

export function storeCookie(name: string, value: string) {
    
    const decodedToken: JwtPayload = jwtDecode(value);
    let days = decodedToken.exp - decodedToken.iat;
    days = Math.floor(days / 60 / 60 / 24);
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = ";expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + ";path=/";
  }
  export function getCookie(cname: string) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  export function deleteCookie(
    name: string,
    path: string = "/",
    domain: string = ""
  ) {
    if (
      document.cookie
        .split(";")
        .some((item) => item.trim().startsWith(name + "="))
    ) {
      document.cookie =
        name +
        "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=" +
        path +
        "; Domain=" +
        domain +
        ";";
    }
  }