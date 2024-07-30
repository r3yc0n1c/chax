import { nanoid } from 'nanoid';

const generateUserId = (length = 21) => {
    const id = nanoid(length);
    return `user${id}`;
}

const avatarGenerator = (userId: string) => {
    const avatarURL = `https://api.dicebear.com/9.x/adventurer/svg?seed=${userId}`
    return avatarURL;
}

export default {
    generateUserId,
    avatarGenerator
};