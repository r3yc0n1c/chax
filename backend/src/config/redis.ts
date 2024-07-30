import config from "./config";
import { createClient } from 'redis';

// Create a Redis client
const redisClient = createClient(config.redis);

// Handle connection events
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

export default redisClient;