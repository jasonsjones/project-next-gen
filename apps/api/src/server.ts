import Express, { Request, Response } from 'express';
import { PORT } from './config.js';

const app = Express();

app.get('/', (_: Request, res: Response): void => {
    res.redirect('/api');
});

app.get('/api', (_: Request, res: Response): void => {
    res.json({
        message: 'It works...!'
    });
});

app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
