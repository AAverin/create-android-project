const Config = (args) => {
  return {
    isForce: args.force,
    isProject: args.type == "project",
    isLibrary: args.type == "library",
    isVerbose: args.v == true,
    ci: {
      publish: {
        maven: args.publish && args.publish.includes("maven"),
        githubPackage:
          args.publish && args.publish.includes("github_gradle_package"),
      },
      githubActions: args.ci && args.ci.includes("github"),
    },
    ktlint: args.common && args.common.includes("ktlint"),
  }
}

module.exports.Config = Config
