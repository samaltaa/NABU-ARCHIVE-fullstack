"use client";
import React, { useEffect, useRef, useState } from "react";

const FaceCapture = () => {
    const [socket, setSocket] = useState(null);
    const [recognizedFace, setRecognizedFace] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws/recognize");
        ws.onopen = () => console.log("WebSocket connection established");
        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            console.log("Received data:", data);
            setRecognizedFace(data);
        };
        ws.onerror = (err) => console.error("WS Error:", err);
        ws.onclose = () => console.log("WebSocket connection closed");
        setSocket(ws);

        return () => ws.close();
    }, []);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true})
        .then(stream => {
            videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Camera error:", err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current && canvasRef.current && socket?.readyState === 1) {
                const ctx = canvasRef.current.getContext("2d");
                ctx.drawImage(videoRef.current, 0, 0, 320, 240);
                const frame = canvasRef.current.toDataURL("image/jpeg");
                socket.send(JSON.stringify({ image: frame }));
            }
        }, 1500); // every 1.5 seconds

        return () => clearInterval(interval);
    }, [socket]);


    return (
    <div className="flex flex-col items-center bg-white p-4 border border-gray-300">
      <div className="flex flex-col items-center mb-4">
        <h1 className="font-bold text-xl text-black ">Face Recognition</h1>
        <p className="text-gray-400">Capture subject face for recognition</p>
      </div>
      <video ref={videoRef} autoPlay playsInline width="320" height="240" />
      <canvas ref={canvasRef} width="420" height="340" className="hidden" />
      <div className="mt-4 text-lg">
        {recognizedFace ? (
          <p className="text-green-600">Subject: {recognizedFace.name}</p>
        ) : (
          <p className="text-gray-500">No match</p>
        )}
      </div>
    </div>
  );
};


export default FaceCapture;