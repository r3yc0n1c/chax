# chax-api

1. Install dependencies:

```bash
bun install
```

2. Redis setup
```sh
docker pull redis
docker run --name wow_redis -itd -p 6379:6379 redis
docker stop wow_redis
```
4. Env file setup ([.env](backend/.env))

3. Run Server

```bash
bun run dev
```

This project was created using `bun init` in bun v1.1.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
