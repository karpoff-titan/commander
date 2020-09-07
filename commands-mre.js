const {cd, join, exec} = require('./base');
const program = require('commander');

const commandsMre = () => {
    const cdMre = () => cd('marketing-review-engine');
    const command = program
        .command('mre')
        .description('marketing review engine app')
        .forwardSubcommands();

    command
        .command('build')
        .description('build mre app')
        .action(() => {
            cdMre();
            exec(`dotnet build`);
        });

    command
        .command('run-landing')
        .description('run mre LandingPage')
        .action(() => {
            cdMre();
            exec(`dotnet run --project ${join('src', 'Web', 'LandingPage', 'LandingPage.csproj')}`);
        });

    command
        .command('run-review')
        .description('run mre ReviewEngineApi')
        .action(() => {
            cdMre();
            exec(`dotnet run --project ${join('src', 'Web', 'ReviewEngine.API', 'ReviewEngine.API.csproj')}`);
        });
}

module.exports.commandsMre = commandsMre;
