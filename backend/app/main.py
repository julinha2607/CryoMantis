from fastapi import FastAPI, WebSocket
from pydantic_settings import BaseSettings

# Pydantic is a library that works with data validation, for example the 
#str for the variables
#we imported the base settings that helps dealing with system configs

class Settings(BaseSettings):
    app_name: str = "CryoMantis API"
    version: str = "0.1.0"

#we have up here our env vars, we did it using the BaseSettings so we have safety and portability to our vars

settings = Settings()
app = FastAPI(tittle=settings.app_name, version=settings.version)

@app.get("/health")
def health():
    return{"status": "ok", "service": settings.app_name, "version": settings.version}


@app.websocket("/ws/telemetry")
async def ws_telemetry(ws: WebSocket):
    await ws.accept()

    try:
        while True:
            msg = await ws.receive_text()
            await ws.send_text(f"echo:{msg}")
    except Exception:
        await ws.close()