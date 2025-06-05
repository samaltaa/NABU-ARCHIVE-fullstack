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
    <div className="flex flex-col items-center bg-white min-h-screen p-8">
      {/* Header Module */}
      <div className="flex flex-col items-center mb-12 bg-slate-50 border-l-4 border-slate-400 shadow-lg w-full max-w-2xl">
        <div className="w-full bg-slate-100 border-b border-slate-300 px-8 py-4">
          <h1 className="font-mono text-2xl font-bold text-slate-900 uppercase tracking-[0.2em] text-center">
            BIOMETRIC SEARCH
          </h1>
        </div>
        <div className="px-8 py-3">
          <p className="font-mono text-sm text-slate-600 uppercase tracking-widest text-center">
            POSITION SUBJECT FOR FACIAL SCAN ANALYSIS
          </p>
        </div>
      </div>

      {/* Video Scanner Module */}
      <div className="relative mb-8">
        {/* Scanner Frame */}
        <div className="relative p-1 bg-gradient-to-b from-slate-200 to-slate-300 shadow-2xl">
          <div className="relative overflow-hidden bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              width="400" 
              height="300"
              className="relative z-10 animate-pulse"
              style={{
                filter: 'contrast(1.1) brightness(1.05)',
                animation: 'scannerGlow 3s ease-in-out infinite alternate'
              }}
            />
            
            
            {/* Corner Brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-green-400"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-green-400"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-green-400"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-green-400"></div>
          </div>
        </div>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} width="420" height="340" className="hidden" />

      {/* Status Display Module */}
      <div className="w-full max-w-md">
        {recognizedFace ? (
          <div 
            className="bg-slate-100 border border-slate-300 shadow-lg transform transition-all duration-500 ease-out"
            style={{
              animation: 'fadeInFlicker 0.8s ease-out'
            }}
          >
            <div className="bg-slate-200 border-b border-slate-400 px-4 py-2">
              <p className="font-mono text-xs text-slate-700 uppercase tracking-widest text-center">
                SUBJECT IDENTIFIED
              </p>
            </div>
            <div className="px-6 py-4 text-center">
              <p className="font-mono text-lg font-bold text-slate-900 uppercase tracking-wider">
                {recognizedFace.name}
              </p>
            </div>
          </div>
        ) : (
          <div 
            className="bg-green-900 border border-green-700 shadow-lg transform transition-all duration-300"
            style={{
              animation: 'successPulse 1.5s ease-in-out infinite alternate'
            }}
          >
            <div className="px-6 py-4 text-center">
              <p className="font-mono text-lg font-bold text-green-100 uppercase tracking-wider">
                MATCH CONFIRMED
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scannerGlow {
          0% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.3); }
          100% { box-shadow: 0 0 40px rgba(74, 222, 128, 0.6); }
        }
        
        @keyframes scanLine {
          0% { top: 0%; opacity: 1; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes fadeInFlicker {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 1; background-color: rgb(226 232 240); }
          40% { background-color: rgb(241 245 249); }
          60% { background-color: rgb(226 232 240); }
          100% { opacity: 1; transform: translateY(0); background-color: rgb(241 245 249); }
        }
        
        @keyframes successPulse {
          0% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
          100% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.7); }
        }
      `}</style>
    </div>
  );
};


export default FaceCapture;