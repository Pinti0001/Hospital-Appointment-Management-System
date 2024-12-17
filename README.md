# Hospital Appointment Management System
   # Home Page -
   ![PHOTO-2024-12-17-11-05-02](https://github.com/user-attachments/assets/0a6e849a-16ef-4157-abb2-e9cc79ca5b0a)
   
   # How we work - 
<img width="1665" alt="Screenshot 2024-12-17 at 10 55 32 AM" src="https://github.com/user-attachments/assets/b1d11f5a-47ef-45e0-afdd-f212b5a23009" />

Welcome to the **Hospital Appointment Management System** (HAMS), a full-stack web application designed to streamline the process of booking medical appointments and managing patient interactions. This system provides an intuitive platform for patients and doctors/hospitals to interact with each other efficiently.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
   - [Patient Interface](#patient-interface)
   - [Doctor/Hospital Interface](#doctorhospital-interface)
   - [System Features](#system-features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Overview
The **Hospital Appointment Management System** is a full-stack web application that enables users to book medical appointments, manage doctor schedules, and more. The system is designed with two main interfaces: 
- **Patient Interface** for booking appointments.
- **Doctor/Hospital Interface** for managing doctor schedules and appointments.

Upon visiting the root route, users can choose to either **Book an Appointment** or **Serve Patients** (if they are a doctor or hospital admin). The application provides several features to facilitate smooth interactions between patients and medical professionals.

---

## Features

### Patient Interface

The Patient Interface is designed to enable patients to book appointments based on their medical needs and locality. 

#### Steps for Interaction:
<img width="1667" alt="Screenshot 2024-12-17 at 11 00 17 AM" src="https://github.com/user-attachments/assets/949d96f9-0486-4533-9391-7bbe25b3badd" />
1. **Collect Patient Information:**
   - The system will ask for basic patient details, including the current locality (which can be updated dynamically if the patient is traveling).
   - The patient will also specify their medical issue or problem.
   
2. **Display Options:**
   - The system will display a list of hospitals with available doctors specializing in the required field, filtered based on the patient’s locality.
   - Each doctor’s profile will include:
     - Name
     - Specialization
     - Available time slots

3. **Appointment Booking:**
   - The patient will be able to select a doctor and book an appointment based on the available time slots.
   - An **Emergency option** will be available in case the patient needs immediate attention.

4. **Post-Visit Review:**
   - After the appointment, patients can leave reviews for both the doctor and the hospital to share their experience.

---

### Doctor/Hospital Interface

The Doctor/Hospital Interface allows hospitals and doctors to manage appointments and schedules effectively.

#### Steps for Interaction:
![PHOTO-2024-12-17-11-03-06](https://github.com/user-attachments/assets/74bde2a9-b9fa-4782-9632-c90424d2f54b)
1. **Input Hospital Information:**
   - The system allows hospitals to input the number of available doctors and their respective working hours.
   
2. **Input Doctor Details:**
   - The hospital can provide details for each doctor, including:
     - Name
     - Specialization

3. **Manage Appointments:**
   - Doctors can view their scheduled appointments and manage availability.
     
3. **Email Service:**
   - For each and every appointment booked the hpspital gets a email.
   - <img width="1356" alt="Screenshot 2024-12-17 at 10 50 50 AM (1)" src="https://github.com/user-attachments/assets/892a475f-637a-4747-95df-2954fb29aa80" />

---

## System Features

- **Appointment Management:**  
  - Patients can view and book appointments, while doctors can view their schedules and manage their slots.

- **Filtering by Locality:**  
  - The system uses the patient’s current location to filter and display relevant hospitals and doctors in the vicinity.

- **Doctor Specialization Mapping:**  
  - Doctors are categorized by their specialization to simplify searches for patients based on their medical needs.

- **Review and Rating:**  
  - After the appointment, patients can provide feedback on their doctor and hospital experience, helping others make informed decisions.

- **Slot Management:**  
  - Doctors' availability is managed by the hospital, ensuring that patients are shown accurate time slots when booking an appointment.

- **Additional Features:**
  - **Directions to Hospital:**  
    - After selecting a hospital, patients will receive directions to the hospital location.
  
  - **Hospital Review:**  
    - Patients can view reviews for each hospital’s service before making a decision.

  - **Online Consultation:**  
    - Patients can opt for an online consultation, either via chat or video call.

  - **Notifications and Reminders:**  
    - Both patients and hospitals will receive notifications to confirm appointments and remind them of upcoming sessions.
   
 - **GPS Enabling:**  
    - Both patients and hospitals are needed to turn on location service to make use of this feature.


---

## Technologies Used

- **Frontend:**
  - React.js (for building interactive UI)
  - Bootstrap/Tailwind CSS (for styling)
  - Google Maps API (for hospital directions)
  - Redux for State Management
  - Materical UI for user experience
  - React icons for Icons
  - Socket io for real time updates
    

- **Backend:**
  - Node.js (for handling server-side logic)
  - Express.js (for building RESTful APIs)
  - MongoDB (for storing data such as users, doctors, appointments, reviews, etc.)
  - JWT (for user authentication)
  - Nodemailer(SMTP) for sending mail to hospital after booking a appointment from user side.
  - Bcryptjs for user user Security for user data and hashing Password.
  - Cloudnary for uploading image
  - Multer for handling Static data like images.
  - Socket.io for real time updates of Appointment confirmation

- **Other Tools:**
  - Socket.io (for real-time notifications and online consultations)
  - Twilio API (for SMS reminders)
  - Video Calling API (for online consultations)

---

## Installation

To run the Hospital Appointment Management System locally, follow the steps below:

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (or a cloud instance like MongoDB Atlas)
- Git


### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Hospital-Appointment-Management-System.git
   cd Hospital-Appointment-Management-System
   

2. Install the dependencies for both frontend and backend:

   - For Backend:
       ```bash
       cd backend
       npm install
   - For Frontend
     ```bash
     cd frontend
     npm install
     
3. Run the development server:

   - For Backend:
       ```bash
       npm start

   - For Frontend
     ```bash
     npm start
4. Open your browser and go to `http://localhost:3000` to view the application.






