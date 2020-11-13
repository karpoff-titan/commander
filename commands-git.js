const {cd, join, exec} = require('./base');
const program = require('commander');

const commandsGit = () => {
    const cdApp = () => cd('app');
    const command = program
        .command('git')
        .description('git helpers')
        .forwardSubcommands();

    command
        .command('gc')
        .description('fix error: cannot lock \'ref/remotes/origin/...\'')
        .action(() => {
            exec(`git gc --prune=now`);
        });
}

module.exports.commandsGit = commandsGit;
