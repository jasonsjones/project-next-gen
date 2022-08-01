import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/authContext';

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    );
}

export default Providers;
