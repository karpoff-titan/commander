const {cd, exec} = require('./base');
const config = require('./config');
const program = require('commander');
const fs = require('fs');

const commandsAg = () => {
    const cdAg = () => cd('api-client-generator');
    const command = program
        .command('ag')
        .description('api-client-generator. use `stc ag run` to run for default main app or `stc ag run-here` to run in current path')
        .forwardSubcommands();

    command
        .command('run')
        .description('run in default path')
        .action(() => {
            cd('app');
            exec(`dotnet build servicetitan.sln`);
            exec(`dotnet tool restore`);
            exec(`dotnet api-client-generator --fastmode -o ./Clients`);
        });

    command
        .command('run-g')
        .description('run in default path')
        .action(() => {
            cd('app');
            exec(`dotnet tool restore`);
            exec(`dotnet api-client-generator --fastmode -o ./Clients`);
        });

    command
        .command('run-here')
        .description('run generator in current path')
        .action(() => {
            exec(`dotnet build servicetitan.sln`);
            exec(`dotnet tool restore`);
            exec(`dotnet api-client-generator --fastmode -o ./Clients`);
        });
}

module.exports.commandsAg = commandsAg;
