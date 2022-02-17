const Config = (args) => {
  const isProject = () => args.type == "project"
  const isLibrary = () => args.type == "library"
  const isVerbose = () => args.v == true

  const isGithubActions = () => args.ci.includes("github")

  const isKtLint = () => args.common.includes("ktlint")

  return {
    isProject: isProject,
    isLibrary: isLibrary,
    isVerbose: isVerbose,
    isGithubActions: isGithubActions,
    isKtLint: isKtLint,
  }
}

module.exports.Config = Config
