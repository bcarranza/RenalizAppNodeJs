// blogRoutes.js
const home = require('./home.controller');

router.get('/blog', home.http);

module.exports = router;
