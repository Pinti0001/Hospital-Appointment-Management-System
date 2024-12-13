import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendAppointmentEmail = async (hospitalEmail, appointmentDetails) => {
    dotenv.config();
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Prepare the email content
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: hospitalEmail, 
      subject: 'New Appointment Booked',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; border-radius: 8px;">
          <h1 style="color: #ff7f50;">New Appointment Booking</h1>
          <p><strong>Patient Name:</strong> ${appointmentDetails.patientName}</p>
          <p><strong>Patient Email:</strong> ${appointmentDetails.patientEmail || 'Patient does not use Email Service'}</p>
          <p><strong>Patient Phone:</strong> ${appointmentDetails.patientPhone}</p>
          <p><strong>Appointment Date:</strong> ${appointmentDetails.date}</p>
          <p><strong>Symptoms:</strong> ${appointmentDetails.symptoms || 'N/A'}</p>

          <!-- Company Logo -->
          <div style="margin-top: 20px;">
            <img src="https://res.cloudinary.com/djhvmfj18/image/upload/v1734074602/uxykvoyrmsn0fuhwxdkb.jpg" alt="HAMS Logo" width="25" height="25 height="auto" />
          </div>

          <p style="margin-top: 20px; font-size: 14px;">Regards,<br/><strong>HAMS</strong></p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Appointment email sent successfully');
  } catch (error) {
    console.error('Error sending appointment email:', error);
    throw new Error('Error sending appointment email');
  }
};
