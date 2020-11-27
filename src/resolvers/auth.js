import User from '@models/user';
import PubSub from '@subscription';
import events from '@subscription/events';
import bcrypt from 'bcryptjs';

const resolver = {
    Mutation: {
        signup: async(_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (user) {
                    throw new Error('Email address is already in use')
                }
                const newUser = await User.create(input);
                PubSub.publish(events.userEvents.USER_CREATED, {
                    userCreated: newUser
                });
                return newUser;
            } catch (error) {
                throw error;
            }
        },
        signin: async(_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (!user) throw new Error('User not found');

                const isValidPassword = await bcrypt.compare(input.password, user.password);
                if (!isValidPassword) throw new Error('Incorrect password');

                const token = user.generateAuthToken();
                return { token };
            } catch (error) {
                throw error;
            }
        }
    }
};

export default resolver;