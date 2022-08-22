const BASE_URL = 'http://localhost:3000';

interface CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface LoginBody {
    email: string;
    password: string;
}

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
    return await res.json();
}

export async function makeLogout() {
    const res = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    return await res.json();
}

export async function makeSignup(dto: CreateUserDto) {
    const res = await fetch(`${BASE_URL}/api/v1/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    });
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
        return await res.json();
    }

    return Promise.resolve({ msg: 'token not available' });
}
