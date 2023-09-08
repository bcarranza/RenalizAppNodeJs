const admin = require('../database/firebase.js');

exports.getAllBlogs = async (request, response) => {
    try {
        const db = admin.firestore();
        const blogCollection = db.collection('Blog');
        
        let query = blogCollection;
        
        if (request.query && request.query.nextPageToken) {

            query = query.startAfter(request.query.nextPageToken);
        }

        const snapshot = await query.limit(10).get(); 
        const blogData = [];

        snapshot.forEach((doc) => {
            blogData.push(doc.data());
        });

        
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        const nextPageToken = lastVisible ? lastVisible.id : null;

        response.status(200).json({ blogData, nextPageToken });
    } catch (error) {
        console.error('Error fetching blog data:', error);
        response.status(500).send('Internal Server Error');
    }
};
