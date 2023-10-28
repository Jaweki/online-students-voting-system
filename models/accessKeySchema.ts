import { Schema, model, models } from "mongoose";

const accessKeySchema = new Schema({
    accessKey: {
        type: 'string',
        required: [true, 'Access Key is required for admin registration']
    },
});

const AccessKey = models.AccessKey || model('AccessKey', accessKeySchema, 'accessKey');
export default AccessKey;