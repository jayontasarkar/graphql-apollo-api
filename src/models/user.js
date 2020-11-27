import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Task'
        }
    ]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
        { id: this._id, email: this.email, name: this.name },
        process.env.JWT_PRIVATE_KEY || 'mysecretkey',
        { expiresIn: '1d' }
    );
	return token;
}

export default mongoose.model('User', userSchema);