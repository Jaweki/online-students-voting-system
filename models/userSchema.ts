import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    userId: {
        type: 'string',
        required: [true, 'regNo is required!'],
    },
    name: {
        type: 'string',
        required: [true, 'Name is required!'],
    },
    email: {
        type: 'string',
        required: [true, 'Email is required!'],
    },
    password: {
        type: 'string',
        required: [true, 'password is required!'],
    },
    avatar: {
        type: 'string',
        required: [true, 'avatar_url is required!'],
    },
    role: {
        type: "string",
        required: [true, "User Role is required"],
    }
})

const SystemUser = models.SystemUser || model('SystemUser', userSchema, 'users');

export default SystemUser;