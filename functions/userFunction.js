const admin = require('firebase-admin');
admin.initializeApp();

const userData = {
    loginInfo: {
        userId: "Pedro Fernandes",
        password: "Otracontra",
        dateOfBirth: "2000-03-17",
        loginTimestamp: "2027-08-23T12:34:56Z"
    },
    googleProfile: {
        googleId: "12345656789078901234567890",
        displayName: "Pedro Fernandes",
        firstName: "Pedrito",
        lastName: "Fernandes",
        image: "https://path-to-image.com/profile.jpg",
        email: "pedrodoe@gmail.com"
    }
};


exports.createUser = async (request, response) => {
    try {
        const db = admin.firestore();
        const userCollection = db.collection('Users');

        //Descomentar para que funcione sin codigo hardcodeado
        //const userData = request.body;

        await userCollection.add(userData);
        response.status(200).send('User created successfully');

    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).send('Internal Server Error');
    }
}