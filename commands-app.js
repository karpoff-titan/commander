const {cd, join, exec} = require('./base');
const program = require('commander');

const commandsApp = () => {
    const command = program
        .command('app')
        .description('main app')
        .forwardSubcommands();

    command
        .command('build')
        .description('build main app')
        .action(() => {
            cd('app');
            exec(`dotnet build ServiceTitan.sln`);
        });

    command
        .command('run')
        .description('run main app backend')
        .action(() => {
            cd('app');
            exec(`dotnet ${join('artifacts', 'bin', 'Debug', 'ServiceTitan.App.Startup.dll')}`);
        });

    command
        .command('start')
        .description('start main app frontend')
        .action(() => {
            cd('app', 'Clients', 'Web');
            exec(`npm start`);
        });
}

module.exports.commandsApp = commandsApp;
