const blogFunctions = require('./functions/blogFunctions')
const testFunctions = require('./functions/testFunctions')
const registerFunctions = require('./functions/registerFunctions')

exports.getAllBlogs = blogFunctions.getAllBlogs;
exports.uploadBlogs = blogFunctions.uploadBlogs;
exports.getTestById = testFunctions.getTests;
exports.postTestResults = testFunctions.postTestResults;
exports.postRegister = registerFunctions.postRegister;
