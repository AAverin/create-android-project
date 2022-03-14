const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const { createAndroidProject } = require("./src")

const argv = yargs(hideBin(process.argv))
  .config()
  .alias("t", "type")
  .describe("t", "Type of project to generate.")
  .choices("t", ["project", "library"])
  .default("t", "project")
  .option("ci", {
    description: "Kind of CI integration",
    default: "",
    choices: ["github", ""],
    type: "array",
  })
  .option("publish", {
    description: "Publication setup",
    default: "",
    choices: ["github_gradle_package", "maven", ""],
    type: "array",
  })
  .option("common", {
    alias: "c",
    description: "Common integrations",
    choices: ["ktlint"],
    type: "array",
  })
  .option("verbose", {
    alias: "v",
    description: "logging",
    type: "boolean",
  })
  .option("force", {
    alias: "f",
    description: "Force apply provided folder.",
    type: "string"
  })
  .help("help").argv

;(async () => {
  await createAndroidProject(argv)
})()
