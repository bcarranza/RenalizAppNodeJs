const admin = require("../database/firebase.js");

const setCorsHeaders = (response) => {
response.set("Access-Control-Allow-Origin", "*");
if (response.method === "OPTIONS") {
    response.set("Access-Control-Allow-Methods", "POST");
    response.set(
    "Access-Control-Allow-Headers",
    "Content-Type , Authorization"
    );
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
    return true;
}
return false;
};
exports.getBlogsBySearch = async (request, response) => {
    if (setCorsHeaders(response)) return;

    try {
    let page = parseInt(request.body.page) || 1;
    let perPage = parseInt(request.body.perPage) || 10;
    let tag = request.tag;
    let date = request.date;
    let author = request.author; 

    let query = admin.firestore()
        .collection("Blogs")
        .orderBy("isStarred", "desc")
        .orderBy("publication_date", "desc")
        .offset((page - 1) * perPage)
        .limit(perPage);

    if (tag) {
        query = query.where("tags", "array-contains", tag);
    }

    if (date) {
        query = query.where("publication_date", "==", date);
    }

    if (author) {
        query = query.where("author", "==", author); 
    }

    const snapshot = await query.get();

    const count = await admin.firestore().collection('Blogs').count().get();

    response
        .status(200)
        .json({
        data: snapshot.docs.map((doc) => doc.data()),
        page,
        perPage,
        allItems: count['_data']['count']
        });
    } catch (error) {
    console.error("Error fetching blog data:", error);
    response.status(500).send("Internal Server Error");
    }
};


