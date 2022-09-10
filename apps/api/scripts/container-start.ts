import { execSync } from 'child_process';
import * as color from './colorUtils';

const projectContainers = ['mailhog', 'pdb', 'pgadmin'];

function getRunningContainers() {
    const containers = execSync(`docker container ls --format "{{.Names}}"`, {
        encoding: 'utf8'
    })
        .split('\n')
        .filter((container) => container != '')
        .sort();

    return containers;
}

function startContainers() {
    execSync(`docker-compose -f ./docker-compose.yml up -d`, {
        encoding: 'utf8',
        stdio: 'inherit'
    });
}

function main() {
    console.log(color.cyan('Fetching running containers...'));
    const runningContainers = getRunningContainers();
    const isRunning = projectContainers.every((c) => runningContainers.includes(c));

    if (isRunning) {
        console.log(color.brightGreen('All dev containers are currently running.  🐳 \n'));
    } else {
        console.log(
            color.magenta('Not all dev containers are running. Spinning up containers now...')
        );
        startContainers();
    }
}

main();
