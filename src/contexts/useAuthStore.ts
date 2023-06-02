import { create } from "zustand";
import { User } from "@prisma/client";

import { UserType, UserOptionType } from "@/types";
import * as lib from "@/lib";

type UserState = {
  session: User["id"] | null;
  signUp: (
    registerData: UserType
  ) => Promise<{ data: User | null; error: string | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | {
        id: null;
        error: string;
      }
    | {
        id: string;
        error: null;
      }
    | undefined
  >;
  signOut: () => void;
  userInfo: (
    id: UserType["id"]
  ) => Promise<{ data: User | null; error: string | null }>;
  updateUser: (
    session: string,
    newData: UserOptionType
  ) => Promise<
    | {
        data: null;
        error: string;
      }
    | {
        data: User;
        error: null;
      }
    | any
  >;
};

const prisma = lib.prisma;

const useAuthStore = create<UserState>()((set) => ({
  session: null,
  signUp: async (registerData) => {
    const { data, error } = await lib.register(registerData);
    const userID = await prisma.user.findUnique({
      where: {
        email: data?.email
      },
      select: {
        id: true
      }
    });
    if (data !== null && error === null) set((state) => ({ session: data.id }));
    return { data: data, error: error };
  },
  signIn: async (email, password) => {
    const user = await lib.signIn(email, password);
    if (user.id === typeof String) set((state) => ({ session: user.id }));
    return user;
  },
  signOut: () => set((state) => ({ session: null })),
  userInfo: async (id) => {
    const { data, error } = await lib.getUserInfo(id);
    return { data: data, error: error };
  },
  updateUser: async (session, newData) => {
    const { data, error } = await lib.updateUserInfo(session, newData);
    return { data: data, error: error };
  }
}));

export default useAuthStore;
