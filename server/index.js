// @flow
import path from 'path';
import express from 'express';
import compression from 'compression';
import getPort from './helpers/getPort';

const app: express$Application = express();
const port: number = getPort();

app.use(compression());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*', (req: express$Request, res: express$Response): void => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use('/health', (req: express$Request, res: express$Response) => res.end('OK'));

app.listen(port, (): Server => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
