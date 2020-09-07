const config = require('./config');
const program = require('commander');

const commandsConfig = () => {
    const command = program
        .command('config')
        .description('config')
        .forwardSubcommands();

    command
        .command('set')
        .arguments('<name> <value>')
        .description('set config value')
        .action(config.set);

    command
        .command('get')
        .description('get config value')
        .arguments('<name>')
        .action(name => console.log(config.get(name)));
}

module.exports.commandsConfig = commandsConfig;
