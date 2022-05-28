import Express, { Request, Response } from 'express';

export function createServer(): Express.Application {
    const app = Express();

    app.get('/', (_: Request, res: Response): void => {
        res.redirect('/api');
    });

    app.get('/api', (_: Request, res: Response): void => {
        res.json({
            ok: true,
            message: 'Welcome to the project next-gen api.'
        });
    });

    app.get('/api/healthcheck', (_: Request, res: Response): void => {
        res.json({
            ok: true,
            message: 'Health Check: All good!'
        });
    });

    return app;
}
