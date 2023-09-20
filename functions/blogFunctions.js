const admin = require("../database/firebase.js");

exports.getAllBlogs = async (req, res) => {
  try {
    let page = req.page || 1;
    let perPage = req.perPage || 10;

    const snapshot = await admin
      .firestore()
      .collection("Blogs")
      .orderBy("publication_date", "asc")
      .offset((page - 1) * perPage)
      .limit(perPage)
      .get();

    res.status(200).json(snapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
};

exports.uploadBlogs = async (req, res) => {
  try {
    const db = admin.firestore().collection("Blogs");

    await db.add();

    res.status(200).send("Success");
  } catch (error) {}
};
