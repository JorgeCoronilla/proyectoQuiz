

export const checkReply = (reply, right) => {
if(reply.answer===right) {
   return true
} else {return false}
}

export const checkArray = (timeName, reply) => {
    timeName.map((timeNa,index) => {
        console.log("Entra en map")
       if (timeNa===reply) {
    
        console.log("Ya está " + timeNa)
        console.log("Entra " + reply)
        return false
    } else {
        return true
    }
    })
}

export const timeNow=() => {
    const d = new Date();
    let time = d.getTime();
    return time
}