const blogFunctions = require('./functions/blogFunctions')
const testFunctions = require('./functions/testFunctions')
const registerFunctions = require('./functions/registerFunctions')
const getuserFunctions = require('./functions/getuserFunctions')
const getAuthorFunctions= require('./functions/getAuthorFunctions')
const getTagsFunctions= require('./functions/getTagsFunctions')
const searchFunctions= require('./functions/searchFunctions')
const mentionstFunctions = require('./functions/mentionsFunctions')
const getTestsByUid = require('./functions/getTestByUidFunction')


exports.getAllBlogs = blogFunctions.getAllBlogs;
exports.uploadBlogs = blogFunctions.uploadBlogs;
exports.getTestById = testFunctions.getTests;
exports.postTestResults = testFunctions.postTestResults;

exports.getTestsByUid = getTestsByUid.getTestsByUid;


exports.postRegister = registerFunctions.postRegister;
exports.getUserByUid = getuserFunctions.getUserByUid;
exports.getAuthor= getAuthorFunctions.getAuthor;
exports.getTag = getTagsFunctions.getTag;
exports.getBlogsBySearch=searchFunctions.getBlogsBySearch;
exports.getMentions = mentionstFunctions.getMentions;
