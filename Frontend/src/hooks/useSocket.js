


import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = io("https://hospital-appointment-management-system-1.onrender.com");

// export const useSocket = (onEvent, eventName = "appointmentUpdate") => {
//     useEffect(() => {
//         // Listen for updates
//         socket.on(eventName, onEvent);

//         return () => {
//             // Cleanup the listener when the component unmounts
//             socket.off(eventName, onEvent);
//         };
//     }, [onEvent, eventName]);
// };

export function useSocket(callback, deps = []) {
    useEffect(() => {
        // Establish socket connection
        // const socket = io(SOCKET_URL);
        const socket = io(SOCKET_URL, {
            transports: ["websocket"], // Force WebSocket transport
            reconnectionAttempts: 5,  // Retry up to 5 times
            timeout: 10000,           // Connection timeout (10 seconds)
        });

        console.log("Connecting to socket...");

        // Check if the socket successfully connects
        socket.on("connect", () => {
            console.log("Socket connected with ID:", socket.id);
        });

        // error
        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        // Handle disconnection
        // socket.on("disconnect", () => {
        //     console.log("Socket disconnected");
        // });
        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });

        // Run the callback to register custom events
        callback(socket);

        // Cleanup on unmount
        return () => {
            console.log("Socket disconnecting on cleanup...");
            socket.disconnect();
        };
    }, deps); // Re-run effect if dependencies change
}

export default SOCKET_URL;
