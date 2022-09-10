import { execSync } from 'child_process';
import * as color from './colorUtils';

function main() {
    console.log(color.magenta('Stopping all dev containers...'));
    execSync(`docker-compose -f ./docker-compose.yml down -v --remove-orphans`, {
        encoding: 'utf8',
        stdio: 'inherit'
    });
}

main();
