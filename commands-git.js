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

    command
        .command('clean-local')
        .description('clean all local branches')
        .action(() => {
            exec(`git branch | grep -v "master" | xargs git branch -D`);
        });

    command
        .command('pull-upstream')
        .description('pull upstream master branch to local master')
        .action(() => {
            exec(`git pull upstream master`);
        });
}

module.exports.commandsGit = commandsGit;
