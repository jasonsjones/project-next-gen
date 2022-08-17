const BASE_URL = 'http://localhost:3000';

interface LoginBody {
    email: string;
    password: string;
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
