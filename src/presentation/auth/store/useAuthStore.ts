import { authCheckStatus, authLogin } from "@/core/actions/actions";
import { User } from "@/core/interfaces/user";
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
  changeStatus: (token?: string, user?: User) => boolean;
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
    return get().changeStatus(response?.token, response?.user);
  },
  logOut: async () => {
    set({
      token: "",
      user: undefined,
      status: "unathenticated",
    });
  },

  changeStatus: (token?: string, user?: User) => {
    if (!token || !user) {
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

    return true;
  },
}));
