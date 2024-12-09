export type MessageText = {
    type : "text"
    text : string
};

export type MessageCode = {
    type : "code"
    text : string
}

export type MessageImage = {
    type : "image"
    text : string
}

export type Message = {
    role : "assistant" | "user"
    content : Array<MessageCode | MessageCode | MessageImage>
}