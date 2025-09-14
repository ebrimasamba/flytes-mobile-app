export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    notifications: boolean;
    currency: string;
    language: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}
