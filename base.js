const child_process = require('child_process');
const crossSpawn = require('cross-spawn');
const path = require('path');
const config = require('./config');
const {CommanderError} = require('./error');

const baseDir = () => {
    const basePath = config.get(config.params.PATH);

    if (!basePath) {
        throw new CommanderError(`base path is not configured, please set it up with 'stc config set path <path>'`);
    }

    return basePath;
};

const join = path.join;

const cd = (...dir) => {
    process.chdir(join(baseDir(), ...dir))
};

const exec = (command) => {
    console.log(`executing in ${process.cwd()}\n${command}\n\n`);

    const [commandName, ...commandArguments] = command.split(' ');
    const result = crossSpawn.sync(commandName, commandArguments, { stdio: 'inherit' });

    if (result.status !== 0) {
        console.error(result);

        throw new CommanderError('command failed');
    }
};

const spawn = (command) => {
    console.log(`executing in ${process.cwd()}\n${command}\n\n`);

    const [commandName, ...commandArguments] = command.split(' ');
    const result = child_process.execSync(commandName, commandArguments);

    if (result.status !== 0) {
        console.error(result);

        throw new CommanderError('command failed');
    }
};

module.exports = {
    baseDir,
    cd,
    join,
    exec,
    spawn,
};
