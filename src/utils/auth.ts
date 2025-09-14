import { LoginCredentials, RegisterCredentials } from '@/types/user';

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validateLoginForm = (credentials: LoginCredentials): string | null => {
    if (!credentials.email.trim()) {
        return 'Email is required';
    }

    if (!validateEmail(credentials.email)) {
        return 'Please enter a valid email address';
    }

    if (!credentials.password.trim()) {
        return 'Password is required';
    }

    return null;
};

export const validateRegisterForm = (credentials: RegisterCredentials): string | null => {
    if (!credentials.name.trim()) {
        return 'Name is required';
    }

    if (credentials.name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }

    if (!credentials.email.trim()) {
        return 'Email is required';
    }

    if (!validateEmail(credentials.email)) {
        return 'Please enter a valid email address';
    }

    if (!credentials.password.trim()) {
        return 'Password is required';
    }

    if (!validatePassword(credentials.password)) {
        return 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }

    return null;
};

export const sanitizeCredentials = (credentials: LoginCredentials | RegisterCredentials) => {
    const sanitized = { ...credentials };

    // Trim whitespace
    Object.keys(sanitized).forEach(key => {
        const value = sanitized[key as keyof typeof sanitized];
        if (typeof value === 'string') {
            sanitized[key as keyof typeof sanitized] = value.trim() as any;
        }
    });

    // Convert email to lowercase
    if ('email' in sanitized) {
        sanitized.email = sanitized.email.toLowerCase();
    }

    return sanitized;
};
