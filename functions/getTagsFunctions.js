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
exports.getTag= async (request ,response) =>{
    if (setCorsHeaders(response)) return;
    try{
        const tags= [];
        const snapshot = await admin.firestore().collection('Blogs').get();
        snapshot.forEach((doc) => {
            const blogTag= doc.data().tags;
            blogTag.forEach((tag) => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
            }
        });
    });
    response.status(200).json(tags); 
    } catch (error) {
    console.error("Error fetching blog data:", error);
    response.status(500).send("Internal Server Error");

    }
};