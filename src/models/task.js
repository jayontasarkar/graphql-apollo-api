import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    }
}, { timestamps: true });

taskSchema.plugin(mongoosePaginate);

export default mongoose.model('Task', taskSchema);