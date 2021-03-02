const fs = require('fs');
const path = require('path');
const {CommanderError} = require('./error');

const configFilePath = () => {
    return path.resolve(__dirname, 'config.json');
};

const readConfig = () => {
    try {
        return JSON.parse(fs.readFileSync(configFilePath()).toString('utf-8'));
    }
    catch (err) {
        return {};
    }
}

const config = {
    params: {
        PATH: 'path',
        APP: 'app',
    },
    get(name) {
        if (!Object.values(config.params).includes(name)) {
            throw new CommanderError(`parameter not supported\n supported list: ${Object.values(config.params).join(', ')}`)
        }

        return readConfig()[name] || params[name].defaultValue;
    },

    set(name, value) {
        if (!Object.values(config.params).includes(name)) {
            throw new CommanderError(`parameter not supported\n supported list: ${Object.values(config.params).join(', ')}`)
        }

        const validate = params[name].validate;
        const error = validate && validate(value);

        if (error) {
            throw new CommanderError(`validation error\n${error}`);
        }

        const configJson = readConfig();

        configJson[name] = value;

        fs.writeFileSync(configFilePath(), JSON.stringify(configJson));
    },
};

const params = {
    [config.params.PATH]: {
        validate: (value) => {
            try {
                if (fs.lstatSync(value).isDirectory()) {
                    return;
                }
            } catch (e) {
            }

            return 'Directory not exists';
        }
    },
    [config.params.APP]: {
        defaultValue: 'app'
    }
}

module.exports = config;