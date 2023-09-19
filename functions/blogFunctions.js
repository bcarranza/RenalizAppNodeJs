const admin = require("../database/firebase.js");

exports.getAllBlogs = async (req, res) => {
  try {
    const db = admin.firestore();

    const query = db.collection("Blogs");

    let page = req.page || 1;
    let perPage = req.appperPage || 4;
    let token = req.token || null;

    if (token) {
      req.startAfter(token);
    }

    const snapshot = await query.orderBy('publication_date', "desc").limit(perPage).get();

    const blogData = snapshot.docs.map((doc) => doc.data());

    const lastBlog = snapshot.docs[snapshot.docs.length - 1];
    const newToken = lastBlog ? lastBlog.id : null;

    res.status(200).json({ blogData, token: newToken });
  } catch (error) {
    console.error("Error fetching blog data:", error);
    response.status(500).send("Internal Server Error");
  }
};

exports.uploadBlogs = async (req, res) => {
  try {
    const db = admin.firestore().collection("Blogs");

    await db.add();

      res.status(200).send(("Success"));
  } catch (error) {}
};
