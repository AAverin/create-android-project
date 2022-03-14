const fs = require("fs");
const fsp = require("fs/promises");

const processFolder = (props) => {
  const { shell, folder, config, logger } = props;
  var result = [];
  if (!fs.statSync(folder).isDirectory()) {
    logger.log(folder, "is not a directory");
    return result;
  }
  logger.logVerbose("processFolder", folder);
  shell.cd(folder);
  const files = shell.ls();
  if (files.includes("rule.js")) {
    logger.logVerbose("Reading rule in", folder);
    const rule = require(`${shell.pwd()}/rule.js`);
    if (!rule.shouldRun(config, logger)) {
      logger.logVerbose("Ignoring due to rule in", folder);
      shell.cd("..");
      return result;
    }
  }

  if (files.includes("commit.msg")) {
    result = processPatches({
      shell: shell,
      logger: logger,
    });
  } else {
    files.forEach((sub) => {
      const subResult = processFolder({
        ...props,
        folder: sub,
      });
      result = [...result, ...subResult];
    });
  }

  shell.cd("..");
  return result;
};

const processPatches = ({ shell, logger }) => {
  const commands = [];
  logger.logVerbose("processPatches");
  const files = shell.ls();
  if (
    files.includes("staged.diff") &&
    fs.statSync(`${shell.pwd()}/staged.diff`).size > 0
  ) {
    commands.push(
      `git apply --ignore-space-change --ignore-whitespace ${shell.pwd()}/staged.diff`
    );
  }
  if (
    files.includes("patch.diff") &&
    fs.statSync(`${shell.pwd()}/patch.diff`).size > 0
  ) {
    commands.push(
      `git apply --ignore-space-change --ignore-whitespace ${shell.pwd()}/patch.diff`
    );
  }
  if (files.includes("run.sh")) {
    commands.push(`bash ${shell.pwd()}/run.sh"`);
  }
  if (files.includes("readme.md")) {
    commands.push(`cat ${shell.pwd()}/readme.md >> ./readme.md`);
  }
  commands.push(`git add -A`);
  if (files.includes("commit.msg")) {
    commands.push(`git commit -m "${shell.cat("commit.msg")}"`);
  } else {
    commands.push(`git commit -m "CAP. Applying patch"`);
  }
  return commands;
};

module.exports.process = processFolder;
