declare global {
    namespace Express {
        interface User {
            id: string;
            firstName: string;
            lastName: string;
        }
    }
}
