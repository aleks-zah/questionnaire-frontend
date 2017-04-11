import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import detect from 'detect-port';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import prompt from 'react-dev-utils/prompt';
import config from '../webpack.config.dev';

const DEFAULT_PORT = process.env.PORT || 8001;
let compiler;

const msToTime = (s) => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;

    return `${mins} min ${secs} sec ${ms} ms`;
};

const setupCompiler = (host, port, protocol) => {
    compiler = webpack(config);

    compiler.plugin('invalid', () => {
        clearConsole();
        console.log('Compiling...');
    });

    compiler.plugin('done', (stats) => {
        clearConsole();

        const time = msToTime(stats.endTime - stats.startTime);
        const messages = formatWebpackMessages(stats.toJson({}, true));
        if (!messages.errors.length && !messages.warnings.length) {
            console.log(chalk.green('Compiled successfully for ' + time));
            console.log();
            console.log('The app is running at:');
            console.log();
            console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
            console.log();
        }

        if (messages.errors.length) {
            console.log(chalk.red('Errors in compile process'));
            console.log();
            messages.errors.forEach(message => {
                console.log(message);
                console.log();
            });
        }

        if (messages.warnings.length) {
            console.log(chalk.yellow('Warnings in compile process'));
            console.log();
            messages.warnings.forEach(message => {
                console.log(message);
                console.log();
            });
        }
    });
};

const addMiddleware = (devServer) => {
    devServer.use(historyApiFallback({
        disableDotRule: true,
        htmlAcceptHeaders: ['text/html', '*/*'],
    }));
    devServer.use(devServer.middleware);
};

const runDevServer = (host, port, protocol) => {
    const devServer = new WebpackDevServer(compiler, {
        clientLogLevel: 'none',
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/
        },
        https: protocol === 'https',
        host: host
    });

    addMiddleware(devServer);

    devServer.listen(port, (err, result) => {
        if (err) {
            return console.log(err);
        }

        clearConsole();
        console.log(chalk.cyan('Starting the development server...'));
        console.log();
    });
};

const run = (port) => {
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const host = process.env.HOST || 'localhost';
    setupCompiler(host, port, protocol);
    runDevServer(host, port, protocol);
};

detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
        run(port);
        return;
    }

    clearConsole();
    const question =
        chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.') +
        '\n\nWould you like to run the app on another port instead?';

    prompt(question, true).then(shouldChangePort => {
        if (shouldChangePort) {
            run(port);
        }
    });
});
