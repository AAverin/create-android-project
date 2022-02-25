const fs = require("fs")
const fsp = require("fs/promises")
const shell = require("shelljs")

const clearTarget = async (target, logger) => {
  if (fs.existsSync(target)) {
    logger.logVerbose("Clearing folder", target)
    await fsp.rm(target, {
      recursive: true,
    })
  }
  await fsp.mkdir(target)
}

const runCommands = async (commands, logger) => {
  logger.logVerbose(shell.pwd())
  commands.forEach((command) => {
    logger.logVerbose("calling command,", command)
    if (shell.exec(command).code !== 0) {
      logger.log("Failed to execute command", command)
      shell.echo("Error: Command failed")
      shell.exit(1)
    }
  })
}

module.exports.generate = async (commands, target, logger) => {
  await clearTarget(target, logger)
  shell.cd(target)
  await runCommands(commands, logger)
}
