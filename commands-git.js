const {cd, join, exec} = require('./base');
const program = require('commander');

const commandsGit = () => {
    const cdApp = () => cd('app');
    const command = program
        .command('git')
        .description('git helpers')
        .forwardSubcommands();

    command
        .command('ref-app')
        .description('fix error: cannot lock \'ref/remotes/origin/...\' (usually happens on windows)')
        .action(() => {
            cdApp();
            exec(`git gc --prune=now`);
            exec(`npx rimraf ${join('.git', 'refs', 'remotes', 'origin')}`);
        });
}

module.exports.commandsGit = commandsGit;
