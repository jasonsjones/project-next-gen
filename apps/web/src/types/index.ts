export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
}

export interface UserCreateDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserUpdateDto {
    email?: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface ClientActions {
    clientActionSuccess?: () => void;
    clientActionError?: () => void;
}
