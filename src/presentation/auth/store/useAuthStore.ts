import { authCheckStatus, authLogin } from "@/core/actions/actions";
import { User } from "@/core/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/secure-storage.adapter";
import { create } from "zustand";
export type AuthStatus = "autheticated" | "unathenticated" | "checking";

interface InitialState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

interface Actions {
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logOut: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

type State = InitialState & Actions;

export const useAuthStore = create<State>()((set, get) => ({
  token: "",
  user: undefined,
  status: "checking",
  checkStatus: async () => {
    const response = await authCheckStatus();

    get().changeStatus(response?.token, response?.user);
  },
  login: async (email, password) => {
    const response = await authLogin(email, password);
    if (response?.token) {
      await SecureStorageAdapter.setItem("token", response.token);
    }
    return get().changeStatus(response?.token, response?.user);
  },
  logOut: async () => {
    await SecureStorageAdapter.deleteItem("token");
    set({
      token: "",
      user: undefined,
      status: "unathenticated",
    });
  },

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      await SecureStorageAdapter.deleteItem("token");
      set({
        status: "unathenticated",
        user: undefined,
        token: "",
      });
      return false;
    }
    set({
      status: "autheticated",
      token,
      user,
    });

    await SecureStorageAdapter.setItem("token", token);

    return true;
  },
}));
