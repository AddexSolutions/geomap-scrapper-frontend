import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  forgetPassword: (email: string, phone: string) => Promise<void>;
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<void>;
  verifyOTP: (token: string, otp: string) => Promise<void>;
  sendResetEmail: (password: string) => Promise<void>;
}