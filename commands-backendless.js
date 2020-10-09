const {cd, join, exec, baseDir} = require('./base');
const program = require('commander');
const fs = require('fs');

const commandsBackendless = () => {
    const command = program
        .command('bs')
        .description('backendless app')
        .forwardSubcommands();

    command
        .command('start')
        .description('start backendless app')
        .action(() => {
            cd('playground', 'backendless');
            fs.writeFileSync('.env', `TARGET_DIR=${join(baseDir(), 'app', 'Apps', 'Web', 'wwwroot')}`);
            exec(`npm start`);
        });

    command
        .command('i')
        .description('install backendless app')
        .action(() => {
            cd('playground', 'backendless');
            exec(`npm i`);
        });
}

module.exports.commandsBackendless = commandsBackendless;
