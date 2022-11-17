import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/authContext';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default Providers;
