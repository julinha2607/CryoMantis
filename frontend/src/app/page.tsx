"use client"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [status, setStatus] = useState ("connecting...");
  const [lastMessage, setLastMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);
  //we're typescript to say that this ref is gonna receive either a Websocket or null 
  // we could receive the null before connecting, that's why we put that there 

  useEffect(() => {
  const ws = new WebSocket("ws://localhost:8000/ws/telemetry")
   wsRef.current = ws;

   ws.onopen = () => setStatus ("connected");
   ws.onmessage = (ev) => setLastMessage(ev.data);
   ws.onclose = () => setStatus("closed");
   ws.onerror = () => setStatus("Error");
  
  return () => ws.close();
  }, []);

 return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>CryoMantis – MVP</h1>
      <p>API WebSocket status: <b>{status}</b></p>

      <button
        onClick={() => wsRef.current?.send("hello from frontend")}
        style={{ padding: 8, marginTop: 12 }}
      >
        Enviar teste
      </button>

      {lastMessage && (
        <p style={{ marginTop: 12 }}>
          Última mensagem recebida: <code>{lastMessage}</code>
        </p>
      )}

      <p style={{ marginTop: 24 }}>
        Teste também <a href="http://localhost:8000/health">/health</a>.
      </p>
    </main>
  );
}




















