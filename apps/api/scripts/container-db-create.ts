import { execSync } from 'child_process';
import * as color from './colorUtils';

function checkAndCreateDb() {
    execSync(`docker exec -i pdb /bin/bash < ./scripts/_db-create-dev.sh`, {
        encoding: 'utf8',
        stdio: 'inherit'
    });
}

function main() {
    console.log(color.cyan('Checking pdb container for existing databases...'));
    checkAndCreateDb();
}

main();
