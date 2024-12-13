// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io("http://localhost:8070");

// const useSocket = () => {
//     const [appointmentUpdate, setAppointmentUpdate] = useState(null);

//     // Set up a listener for appointment updates from the server
//     useEffect(() => {
//         socket.on('appointmentUpdate', (data) => {
//             console.log('Appointment Update:', data);
//             setAppointmentUpdate(data);
//         });

//         // Cleanup on unmount
//         return () => {
//             socket.off('appointmentUpdate');
//         };
//     }, []);

//     return appointmentUpdate;
// };

// export default useSocket;



import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8070"); // Replace with your backend URL

export const useSocket = (onEvent, eventName = "appointmentUpdate") => {
  useEffect(() => {
    // Listen for updates
    socket.on(eventName, onEvent);

    return () => {
      // Cleanup the listener when the component unmounts
      socket.off(eventName, onEvent);
    };
  }, [onEvent, eventName]);
};

export default socket;
