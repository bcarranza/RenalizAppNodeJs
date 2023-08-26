exports.createUser = async (request, response) => {
    try {
        const db = admin.firestore();
        const userCollection = db.collection('Users');
        
        const newUser = {
            loginInfo: {
                userId: request.body.loginInfo.userId,
                loginTimestamp: request.body.loginInfo.loginTimestamp,
                ipAddress: request.body.loginInfo.ipAddress,
            },
            googleProfile: {
                googleId: request.body.googleProfile.googleId,
                displayName: request.body.googleProfile.displayName,
                firstName: request.body.googleProfile.firstName,
                lastName: request.body.googleProfile.lastName,
                image: request.body.googleProfile.image,
                email: request.body.googleProfile.email,
            },
        };
        
        const userRef = await userCollection.add(newUser);
        const user = await userRef.get();
        
        response.status(201).json({ id: user.id, ...user.data() });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).send('Internal Server Error');
    }
}; 