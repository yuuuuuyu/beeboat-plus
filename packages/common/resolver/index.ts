module.exports = () => {
    return name => {
        // where `componentName` is always CapitalCase
        if (name.match(/^P[A-Z]/))
            return {
                name: name.slice(2),
                from: 'beeboat-plus',
            }
    }
}
