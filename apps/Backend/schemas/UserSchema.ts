import mongoose from 'mongoose';

export interface iUser {
    username: string;
    password: string;
    passwordUpdated: Date;
}

const UserSchema = new mongoose.Schema<iUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    passwordUpdated: {type: Date, default: Date.now}
})

const User = mongoose.model<iUser>('User', UserSchema);
export default User;