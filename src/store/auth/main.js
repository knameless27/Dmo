import { defineStore } from "pinia";
import Cookies from "js-cookie";

const defaultValue = {
  user: {
    id: 0,
    name: "",
    lastname: "",
    telephone: "",
    email: "",
    identification: "",
    address: "",
    status: true,
    deleted_at: null,
    created_at: "",
    updated_at: "",
    full_name: "",
    roles: [
      {
        id: 0,
        name: "",
        guard_name: "",
        created_at: "",
        updated_at: "",
        pivot: {
          model_id: 0,
          role_id: 0,
          model_type: "",
        },
      },
    ],
  },
  permissions: [],
  token: "",
  token_type: "Bearer",
};

export const userCreds = defineStore({
  id: "u-cred",
  state: () => ({
    creds: defaultValue,
  }),
  actions: {
    newCreds(newData) {
      this.creds = newData;
    },
    noCreds() {
      this.creds = defaultValue;
    },
  },
});

const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY;

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
export function getUser() {
  return JSON.parse(localStorage.getItem("user_data"));
}

export function setToken(data) {
  const token = data.token;
  delete data.token;
  const newData = {
    ...data,
  };
  localStorage.setItem("user_data", JSON.stringify(newData));
  Cookies.set(TOKEN_KEY, token, {
    secure: true,
    httpOnly: false,
    sameSite: "Strict",
  });
}

export function removeCreds() {
  Cookies.remove(TOKEN_KEY);
  localStorage.clear();
}
