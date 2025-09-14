import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '@/types/user';

interface AuthActions {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,

            // Actions
            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });

                try {
                    // Simulate API call - replace with actual authentication logic
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock user data - replace with actual user data from API
                    const user: User = {
                        id: '1',
                        name: credentials.email.split('@')[0],
                        email: credentials.email,
                        avatar: undefined,
                        preferences: {
                            theme: 'light',
                            notifications: true,
                            currency: 'USD',
                            language: 'en',
                        },
                    };

                    set({
                        isAuthenticated: true,
                        user,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Login failed',
                    });
                }
            },

            register: async (credentials: RegisterCredentials) => {
                set({ isLoading: true, error: null });

                try {
                    // Simulate API call - replace with actual registration logic
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock user data - replace with actual user data from API
                    const user: User = {
                        id: '1',
                        name: credentials.name,
                        email: credentials.email,
                        avatar: undefined,
                        preferences: {
                            theme: 'light',
                            notifications: true,
                            currency: 'USD',
                            language: 'en',
                        },
                    };

                    set({
                        isAuthenticated: true,
                        user,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Registration failed',
                    });
                }
            },

            logout: () => {
                set({
                    isAuthenticated: false,
                    user: null,
                    error: null,
                });
            },

            updateUser: (userUpdates: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...userUpdates },
                    });
                }
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
            }),
        }
    )
);
