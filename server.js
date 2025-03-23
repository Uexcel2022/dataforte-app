import app from "./app.js";

const port = process.env.PORT||3000;
const server = app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})

process.on('unhandledRejection',err=>{
    console.log('UNHANDLED REJECTION! shutting down')
    server.close(()=>{
        process.exit(1)
    })
})