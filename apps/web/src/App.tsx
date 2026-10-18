import { Button, TextArea } from '@heroui/react';
import { useEffect, useState } from 'react';
import {
  HiPaperClip,
  HiPaperAirplane
} from "react-icons/hi"
import { io, Socket } from "socket.io-client"

function App() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(io("http://localhost:21024"));
  }, [])

  const handleClickSocket = () => {
    socket?.emit("ping");
    socket?.on("pong", (data) => {
      console.log(data);
    })
  }

  return (
    <>
      <section id="chat" className="flex justify-center max-w-screen w-screen overflow-hidden max-h-screen h-screen">
        <div className="w-[800px] bg-green-100 p-3">
          <div className="grid gap-5">
            <div id="messages" className="w-full h-220">

            </div>
            <div className="w-full bg-white p-3 rounded-3xl">
              <div className="flex gap-2">
                <Button variant="ghost" className={"rounded-xl size-10 text-2xl"}>
                  <HiPaperClip size={32}/>
                </Button>
                <TextArea
                  fullWidth
                  className={"resize-none shadow-none"}
                  rows={1}
                  placeholder="Введите текст"
                />
                <Button variant="ghost" className={"rounded-xl size-10 text-2xl"}
                  onClick={handleClickSocket}
                >
                  <HiPaperAirplane size={22} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
