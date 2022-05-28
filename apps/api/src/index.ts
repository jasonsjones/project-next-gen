import { createServer } from './server.js';
import { PORT } from './config.js';

const server = createServer();

server.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
