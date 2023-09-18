const admin = require('../database/firebase.js');

exports.getAllBlogs = async (request, response) => {
   
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method === 'OPTIONS') {
        response.set('Access-Control-Allow-Methods', 'GET');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.set('Access-Control-Max-Age', '3600');
        response.status(204).send('');
        return;
    }

    try {
        const db = admin.firestore();
        const blogCollection = db.collection('Blog');
            
        const snapshot = await blogCollection.get();
        const blogData = [];
            
        snapshot.forEach((doc) => {
            blogData.push(doc.data());
        });
            
        response.status(200).json(blogData);
    } catch (error) {
        console.error('Error fetching blog data:', error);
        response.status(500).send('Internal Server Error');
    }
};
