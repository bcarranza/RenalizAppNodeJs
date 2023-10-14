const admin = require('../database/firebase.js');
const cors = require('cors');
const corsHandler = cors({ origin: true });
const nodemailer = require('nodemailer'); // Asegúrate de instalar la biblioteca 'nodemailer'

exports.postRegister = async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const db = admin.firestore();
      const RegistroUsuariosCollection = db.collection('RegistroUsuarios');

      const resultData = request.body;

      if (!resultData.name || !resultData.dob || !resultData.phoneNumber) {
        return response.status(400).json({ message: 'Nombre, fecha de nacimiento y número de teléfono son campos obligatorios' });
      }

      const { name, dob, address, phoneNumber, email } = resultData;

      const userData = {
        name,
        dob,
        address: address || null,
        phoneNumber,
      };

      const userDocRef = await RegistroUsuariosCollection.add(userData);

      // Envía el correo de bienvenida
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'renalizapp@gmail.com', // Cambia esto a tu dirección de correo
          pass: 'tu_contraseña', // Cambia esto a tu contraseña
        },
      });

      const mailOptions = {
        from: 'renalizapp@gmail.com',
        to: email, // Usamos el correo proporcionado en la solicitud
        subject: '¡Bienvenido a RenalizApp!',
        text: '¡Bienvenido a RenalizApp! Gracias por registrarte en nuestra plataforma.',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo de bienvenida:', error);
        } else {
          console.log('Correo de bienvenida enviado con éxito:', info.response);
        }
      });

      response.status(201).json({ message: 'Usuario registrado exitosamente', user: userData, userId: userDocRef.id });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error en el registro' });
    }
  });
};

