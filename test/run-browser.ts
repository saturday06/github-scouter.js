declare var require
var testsContext = require.context(".", true, /.test$/)
testsContext.keys().forEach(testsContext)
