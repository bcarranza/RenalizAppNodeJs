const blogFunctions = require('./functions/blogFunctions')
const testFunctions = require('./functions/testFunctions')
const registerFunctions = require('./functions/registerFunctions')
const getuserFunctions = require('./functions/getuserFunctions')
const getAuthorFunctions= require('./functions/getAuthorFunctions')
const getTagsFunctions= require('./functions/getTagsFunctions')
const searchFunctions= require('./functions/searchFunctions')
const mentionstFunctions = require('./functions/mentionsFunctions')
const getTestsByUid = require('./functions/getTestByUidFunction')
const medcenterFunctions = require('./functions/medcenterFunctions')
const getResultDetail = require('./functions/getResultDetail')

const Feedback = require('./functions/feedbackFunctions');


const Feedback = require('./functions/feedbackFunctions');



exports.getAllBlogs = blogFunctions.getAllBlogs;
exports.uploadBlogs = blogFunctions.uploadBlogs;
exports.getTestById = testFunctions.getTests;
exports.postTestResults = testFunctions.postTestResults;
exports.postRegister = registerFunctions.postRegister;
exports.getUserByUid = getuserFunctions.getUserByUid;
exports.getDetailTest= getResultDetail.getDetailTest


exports.getLugaresAtencion = medcenterFunctions.getLugaresAtencion;
exports.getLugaresAtencionbyUID = medcenterFunctions.getLugaresAtencionbyUID;
exports.getTestsByUid = getTestsByUid.getTestsByUid;
exports.postRegister = registerFunctions.postRegister;
exports.getUserByUid = getuserFunctions.getUserByUid;
exports.getAuthor= getAuthorFunctions.getAuthor;
exports.getTag = getTagsFunctions.getTag;
exports.getBlogsBySearch=searchFunctions.getBlogsBySearch;
exports.getMentions = mentionstFunctions.getMentions;

exports.postFeedback = Feedback.postFeedback;

