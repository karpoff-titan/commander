#!/usr/bin/env node
const program = require('commander');
const {initCommander} = require('./commander');
const {CommanderError} = require('./error');
const {commandsConfig} = require('./commands-config');
const {commandsApp} = require('./commands-app');
const {commandsMre} = require('./commands-mre');

initCommander();

commandsConfig();
commandsApp();
commandsMre();

try {
    program.parse(process.argv);
} catch (e) {
    if (e instanceof CommanderError) {
        console.error(e.message);
    } else {
        throw e;
    }
}
