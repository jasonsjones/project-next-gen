import Express, { Request, Response } from 'express';
import morgan from 'morgan';

function setupRoutes(app: Express.Application): void {
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
}

export function createServer(): Express.Application {
    const app = Express();

    if (app.settings.env === 'development') {
        app.use(morgan('dev'));
    } else if (app.settings.env === 'production') {
        app.use(morgan('combined'));
    }

    setupRoutes(app);

    return app;
}
