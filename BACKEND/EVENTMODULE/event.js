// EventEmitter is a class
// emit("event param"}:trigger/create/fire and on("event emit param")
 const EventEmitter = require('events');
 const event = new EventEmitter();
// event.on("greet", () => {
//     console.log("This is Event Emitter");
// })
event.once("greet",()=>{
    console.log("call event only once")
})
event.emit("greet");
event.emit("greet");
event.emit("greet");
event.emit("greet");