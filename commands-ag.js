const {cd, exec} = require('./base');
const config = require('./config');
const program = require('commander');

const commandsAg = () => {
    const cdAg = () => cd('api-client-generator');
    const command = program
        .command('ag')
        .description('api-client-generator')
        .forwardSubcommands();

    command
        .command('build')
        .description('build mre app')
        .action(() => {
            cdAg();
            exec(`git pull`);
            exec(`dotnet tool install --local ServiceTitan.ApiClientGenerator.Tool`);
            exec(`dotnet tool restore`);
        });

    command
        .command('run')
        .description('run generator')
        .arguments('<module>')
        .action((module) => {
            cdAg();
            exec(`dotnet api-client-generator ../${config.get(config.params.APP)}/artifacts/bin/Debug/ServiceTitan.Module.${module}.Web.dll --fastmode -o ../${config.get(config.params.APP)}/Clients/Web`);
        });
}

module.exports.commandsAg = commandsAg;
