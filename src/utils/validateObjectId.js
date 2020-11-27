import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const validateObjectId = (id) => {
    return ObjectId.isValid(id);
}

export default validateObjectId;