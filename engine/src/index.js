const fs = require("fs")
const fsp = require("fs/promises")

const shell = require("shelljs")

const GEN = "generated"

const commandsProcessor = require("./commandsProcessor")
const { Config } = require("./config")
const { Log } = require("./log")

module.exports.createAndroidProject = async (args) => {
  const config = Config(args)
  const logger = Log(config)
  const { log, logVerbose } = logger

  if (fs.existsSync(GEN)) {
    logVerbose("Clearing folder", GEN)
    await fsp.rm(GEN, {
      recursive: true,
    })
  }
  await fsp.mkdir(GEN)

  log("createAndroidProject", args)

  var mainFolder = ""
  if (config.isProject()) {
    mainFolder = "project"
    logVerbose("CAP: Project")
  } else if (config.isLibrary()) {
    mainFolder = "library"
    logVerbose("CAP: Library")
  }

  const commands = [
    "git init",
    ...commandsProcessor.process({
      shell: shell,
      folder: mainFolder,
      config: config,
      logger: logger,
    }),
  ]

  logVerbose("Commands", commands)
}
