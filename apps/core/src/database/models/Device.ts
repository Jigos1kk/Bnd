import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

export interface IDevice {
    uuid?: string;
    identityPublicKey: Uint8Array,
    signedPreKey: Uint8Array
}

const deviceSchema = new Schema<IDevice>({
    uuid: { 
        type: String, 
        unique: true,
        default: randomUUID 
    },
    identityPublicKey: {
        type: String,
        require: true,
    },
    signedPreKey: {
        type: String,
        require: true
    }
});

export const Device = model("Device", deviceSchema);