const blogFunctions = require('./functions/blogFunctions')
const testFunctions = require('./functions/testFunctions')

exports.getAllBlogs = blogFunctions.getAllBlogs;
exports.uploadBlogs = blogFunctions.uploadBlogs;
exports.getTestById = testFunctions.getTests;
exports.postTestResults = testFunctions.postTestResults;

