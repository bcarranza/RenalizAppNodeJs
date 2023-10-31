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

exports.getAllBlogs = async (request, response) => {
  if (setCorsHeaders(response)) return;

  try {
    let page = parseInt(request.body.page) || 1;
    let perPage = parseInt(request.body.perPage) || 10;

    const snapshot = await admin
      .firestore()
      .collection("Blogs")
      .orderBy("isStarred", "desc")
      .orderBy("publication_date", "desc")
      .offset((page - 1) * perPage)
      .limit(perPage)
      .get();

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

exports.uploadBlogs = async (req, res) => {
  if (setCorsHeaders(res)) return;

  try {
    const db = admin.firestore().collection("Blogs");
    const newBlogData = {
      author: req.body.author,
      category: req.body.category,
      cover_image: req.body.cover_image,
      description: req.body.description,
      images: req.body.images,
      isStarred: req.body.isStarred,
      publication_date: req.body.publication_date,
      tags: req.body.tags,
      title: req.body.title
    };

    const docRef = await db.add(newBlogData);

    res.status(200).json({
      message: "Successfully created blog",
      blogId: docRef.id 
      
    });
  } catch (error) {
    console.error("Error uploading blog:", error);
    res.status(500).send("Internal Server Error");
  }
};
