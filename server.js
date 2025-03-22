import app from "./app.js";

const port = process.env.SERVER_PORT||3000;
const server = app.listen(port,'127.0.0.1',()=>{
    console.log(`Server started on port ${port}`);
})

process.on('unhandledRejection',err=>{
    console.log('UNHANDLED REJECTION! shutting down')
    server.close(()=>{
        process.exit(1)
    })
})