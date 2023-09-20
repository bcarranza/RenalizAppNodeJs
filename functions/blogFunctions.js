const admin = require("../database/firebase.js");

const setCorsHeaders = (response) => {
    response.set('Access-Control-Allow-Origin', '*');
    if (response.method === 'OPTIONS') {
        response.set('Access-Control-Allow-Methods', 'POST');
        response.set('Access-Control-Allow-Headers', 'Content-Type , Authorization');
        response.set('Access-Control-Max-Age', '3600');
        response.status(204).send('');
        return true;
    }
    return false;
};

exports.getAllBlogs = async (request, response) => {
    if (setCorsHeaders(response)) return;

    try {
        let page = request.page || 1;
        let perPage = request.perPage || 10;

        const snapshot = await admin
            .firestore()
            .collection("Blogs")
            .orderBy("publication_date", "asc")
            .offset((page - 1) * perPage)
            .limit(perPage)
            .get();

        response.status(200).json(snapshot.docs.map((doc) => doc.data()));
    } catch (error) {
        console.error('Error fetching blog data:', error);
        response.status(500).send('Internal Server Error');
    }
};

exports.uploadBlogs = async (req, res) => {
    if (setCorsHeaders(res)) return;

    try {
        const db = admin.firestore().collection("Blogs");

        await db.add();

        res.status(200).send("Success");
    } catch (error) {
        console.error('Error uploading blog:', error);
        res.status(500).send('Internal Server Error');
    }
};
