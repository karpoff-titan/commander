const {cd, join, exec, baseDir} = require('./base');
const program = require('commander');
const fs = require('fs');
const path = require('path');

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
}

module.exports.commandsBackendless = commandsBackendless;
