require('typescript-require')()

require("fs").readdirSync(__dirname).forEach((file) => {
    if (/\.test\.ts$/.test(file) && !/^\./.test(file)) {
        require("./" + file)
    }
})
