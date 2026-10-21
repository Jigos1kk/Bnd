import { Model } from "mongoose";
import { Device, IDevice } from "../models/Device.js";

export class DeviceRepository {
    async findById(id: string) {
        return Device.findById(id)
            .lean().exec();
    }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = ( page - 1 ) * limit;

        const [data, total] = await Promise.all([
            Device.find()
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            Device.countDocuments().exec()
        ])

        return data;
    }

    async create(data: IDevice) {
        const device = new Device(data);
        return device.save()
    }
}