import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  login: (accessToken: string, expiresIn: number) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresIn: null,
      isAuthenticated: false,
      login: (accessToken, expiresIn) => set({ 
        accessToken, 
        expiresIn, 
        isAuthenticated: true 
      }),
      logout: () => set({ 
        accessToken: null, 
        expiresIn: null, 
        isAuthenticated: false 
      }),
      checkAuth: () => {
        const { accessToken, expiresIn, logout } = get();
        
        // If no token or expiration, not authenticated
        if (!accessToken || !expiresIn) {
          return false;
        }
        
        // Check if token has expired (current time > expiration time)
        const now = Math.floor(Date.now() / 1000); 
        if (now > expiresIn) {
          // Token expired, logout
          logout();
          return false;
        }
        
        return true;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)