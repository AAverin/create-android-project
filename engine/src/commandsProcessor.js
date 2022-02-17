const fs = require("fs")
const fsp = require("fs/promises")

const processFolder = (props) => {
  const { shell, folder, config, logger } = props
  var result = []
  if (!fs.statSync(folder).isDirectory()) return result
  logger.logVerbose("processFolder", folder)
  shell.cd(folder)
  const files = shell.ls()
  if (files.includes("rule.js")) {
    const rule = require(`${shell.pwd()}/rule.js`)
    if (!rule.shouldRun(config, logger)) {
      logger.logVerbose("Ignoring due to rule in", folder)
      shell.cd("..")
      return result
    }
  }
  if (files.includes("commit.msg")) {
    result = processPatches({
      shell: shell,
      logger: logger,
    })
  } else {
    files.forEach(async (sub) => {
      result = [
        ...result,
        ...processFolder({
          ...props,
          folder: sub,
        }),
      ]
    })
  }
  shell.cd("..")
  return result
}

const processPatches = ({ shell, logger }) => {
  const commands = []
  const files = shell.ls()
  if (files.includes("staged.diff")) {
    commands.push(`git apply ${shell.pwd()}/staged.diff`)
  }
  if (files.includes("patch.diff")) {
    commands.push(`git apply ${shell.pwd()}/patch.diff`)
  }
  if (files.includes("patch.diff")) {
    commands.push(`git commit -m "${shell.cat("commit.msg")}"`)
  }
  if (files.includes("run.sh")) {
    commands.push(`bash ${shell.pwd()}/patch.diff"`)
  }
  logger.logVerbose("processPatches")
  return commands
}

module.exports.process = processFolder
