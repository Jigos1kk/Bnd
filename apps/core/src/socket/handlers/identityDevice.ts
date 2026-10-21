import type { Socket } from "socket.io";
import { SocketEvents } from "../events.js";
import { deviceRepository } from "../../database/repositories/index.js";
import { IDevice } from "../../database/models/Device.js";
import { DeviceRepository } from "../../database/repositories/deviceRepository.js";

export function identityDeviceHandler(socket: Socket): void {
  socket.on(SocketEvents.IDENTITY_DEVICE, async (data) => {
    console.log(123);
    
    const deviceRepository = new DeviceRepository();
    deviceRepository.create(data)
  });
}
