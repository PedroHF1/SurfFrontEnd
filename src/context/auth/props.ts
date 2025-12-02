export interface AuthContextUser {
  id: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  createdAt: string | null;
  token?: string | null;
}

export interface AuthContextProps {
  user: AuthContextUser | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (credentials: { name: string; email: string; password: string }) => Promise<void>;
  verifyToken: () => void;
  setUser: (user: AuthContextUser) => void;
}

export interface AuthStoreProviderProps {
  children: React.ReactNode;
}
