const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true }); 

exports.postBlog = async (req, res) => {
    if (setCorsHeaders(res)) return;
  
    try {
      const db = admin.firestore();
      const blogId = req.params.blogId; 
  
   
      const blogRef = db.collection("Blogs").doc(blogId);
      const blogSnapshot = await blogRef.get();
  
      if (!blogSnapshot.exists) {
        res.status(404).json({ error: "Blog no encontrado" });
        return;
      }
  
      const existingBlogData = blogSnapshot.data();
  
      // Actualizar los campos necesarios
      if (req.body.author) existingBlogData.author = req.body.author;
      if (req.body.category) existingBlogData.category = req.body.category;
      if (req.body.cover_image) existingBlogData.cover_image = req.body.cover_image;
      if (req.body.description) existingBlogData.description = req.body.description;
      if (req.body.images) existingBlogData.images = req.body.images;
      if (req.body.isStarred !== undefined) existingBlogData.isStarred = req.body.isStarred;
      if (req.body.publication_date) existingBlogData.publication_date = req.body.publication_date;
      if (req.body.tags) existingBlogData.tags = req.body.tags;
      if (req.body.title) existingBlogData.title = req.body.title;
  
      
      await blogRef.set(existingBlogData);
  
      res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error("Error editing blog:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  exports.deleteBlog = async (req, res) => {
    if (setCorsHeaders(res)) return;
  
    try {
      const db = admin.firestore();
      const blogId = req.params.blogId; 
  
      
      const blogRef = db.collection("Blogs").doc(blogId);
  
      // Eliminar el blog
      await blogRef.delete();
  
      res.status(200).json({ message: "Blog successfully deleted" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  