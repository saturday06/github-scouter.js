require("fs").readdirSync(__dirname).forEach((file) => {
    if (/\.test\.js$/.test(file) && !/^\./.test(file)) {
        require("./" + file)
    }
})
