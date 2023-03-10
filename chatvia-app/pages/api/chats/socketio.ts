import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/chat";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { SOCKET_IO_API } from "@/types/constant";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketIO  = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...✅");

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: SOCKET_IO_API.SOCKET_IO,
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default SocketIO;