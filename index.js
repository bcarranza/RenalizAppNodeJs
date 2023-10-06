const blogFunctions = require('./functions/blogFunctions')
const testFunctions = require('./functions/testFunctions')
const registerFunctions = require('./functions/registerFunctions')
const getuserFunctions = require('./functions/getuserFunctions')
const mentionstFunctions = require('./functions/mentionsFunctions')
const getTestsByUid = require('./functions/getTestByUidFunction')
const medcenterFunctions = require('./functions/medcenterFunctions')

exports.getAllBlogs = blogFunctions.getAllBlogs;
exports.uploadBlogs = blogFunctions.uploadBlogs;
exports.getTestById = testFunctions.getTests;
exports.postTestResults = testFunctions.postTestResults;
exports.postRegister = registerFunctions.postRegister;
exports.getUserByUid = getuserFunctions.getUserByUid;
exports.getLugaresAtencion = medcenterFunctions.getLugaresAtencion;
exports.getLugaresAtencionbyUID = medcenterFunctions.getLugaresAtencionbyUID;
exports.getTestsByUid = getTestsByUid.getTestsByUid;
exports.postRegister = registerFunctions.postRegister;
exports.getUserByUid = getuserFunctions.getUserByUid;
exports.getMentions = mentionstFunctions.getMentions;


