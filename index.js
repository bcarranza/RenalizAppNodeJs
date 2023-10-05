const blogFunctions = require('./functions/blogFunctions')
const testFunctions = require('./functions/testFunctions')
const registerFunctions = require('./functions/registerFunctions')
const getuserFunctions = require('./functions/getuserFunctions')
const getTestsByUid = require('./functions/getTestByUidFunction')

exports.getAllBlogs = blogFunctions.getAllBlogs;
exports.uploadBlogs = blogFunctions.uploadBlogs;
exports.getTestById = testFunctions.getTests;
exports.postTestResults = testFunctions.postTestResults;

exports.getTestsByUid = getTestsByUid.getTestsByUid;


exports.postRegister = registerFunctions.postRegister;
exports.getUserByUid = getuserFunctions.getUserByUid;

