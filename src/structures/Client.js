// Client to extend
const { Client, Collection } = require('discord.js');

// Command and event registries
const CommandRegistry = require('./registry/CommandRegistry');
const EventRegistry = require('./registry/EventRegistry');

// Bot owners
const { OWNERS } = process.env;

// Class declaration
module.exports = class YokitsuClient extends Client {
  constructor(options) {
    super(options);

    this.cmds = new Collection();
    this.color = 7878056;
    this.commandRegistry = new CommandRegistry(this);
    this.eventRegistry = new EventRegistry(this);
  }

  async build(token) {
    this.commandRegistry.build();
    this.eventRegistry.build();
    this.login(token)
      .then(() => console.log(`[Process ${process.pid}] Yokitsu is connecting via WS to Discord`));
  }

  getOP(id) {
    return OWNERS.split(',').includes(id);
  }
}
