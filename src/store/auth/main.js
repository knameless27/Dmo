import { defineStore } from "pinia";

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
