module.exports.Log = (config) => {
  const logVerbose = (...msgs) => {
    if (config.isVerbose) console.log(...msgs)
  }

  const log = (...msgs) => {
    console.log(...msgs)
  }

  return {
    logVerbose: logVerbose,
    log: log
  }
}
