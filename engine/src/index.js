const fs = require("fs")
const fsp = require("fs/promises")

const shell = require("shelljs")

const GEN = "generated"

const commandsProcessor = require("./commandsProcessor")
const projectGenerator = require("./projectGenerator")
const { Config } = require("./config")
const { Log } = require("./log")

module.exports.createAndroidProject = async (args) => {
  const config = Config(args)
  const logger = Log(config)
  const { log, logVerbose } = logger

  log("createAndroidProject", config)

  var mainFolder = ""
  if (config.isProject) {
    mainFolder = "project"
    logVerbose("Create Android Project: Project")
  } else if (config.isLibrary) {
    mainFolder = "library"
    logVerbose("Create Android Project: Library")
  }

  const commands = [
    "git init",
    "touch readme.md",
    ...commandsProcessor.process({
      shell: shell,
      folder: mainFolder,
      config: config,
      logger: logger,
    }),
  ]

  logVerbose("All commands", commands)

  await projectGenerator.generate(commands, GEN, logger)
}
