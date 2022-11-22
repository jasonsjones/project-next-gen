import { LoginBody, User, UserCreateDto, UserUpdateDto } from './types';

const BASE_URL = 'http://localhost:3000';

function getCookieValue(key: string) {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1];

    return cookieValue;
}

export async function makeLogin({ email, password }: LoginBody) {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        const cause = await res.json();
        throw new Error(res.statusText, { cause });
    }

    return await res.json();
}

export async function makeLogout() {
    const res = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!res.ok) {
        const cause = await res.json();
        throw new Error(res.statusText, { cause });
    }

    return await res.json();
}

export async function makeSignup(dto: UserCreateDto) {
    const res = await fetch(`${BASE_URL}/api/v1/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });

    if (!res.ok) {
        const cause = await res.json();
        throw new Error(res.statusText, { cause });
    }

    return await res.json();
}

export async function fetchToken() {
    if (getCookieValue('authd')) {
        const res = await fetch(`${BASE_URL}/api/v1/auth/token`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            const cause = await res.json();
            throw new Error(res.statusText, { cause });
        }

        return await res.json();
    }

    return Promise.resolve({ msg: 'token not available' });
}

export function generateFetchMe(token: string) {
    return async () => {
        const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const cause = await res.json();
            throw new Error(res.statusText, { cause });
        }

        return await res.json();
    };
}

export async function fetchMe({ queryKey }: { queryKey: string[] }) {
    const [, token] = queryKey;
    const res = await fetch(`${BASE_URL}/api/v1/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const cause = await res.json();
        throw new Error(res.statusText, { cause });
    }

    return await res.json();
}
