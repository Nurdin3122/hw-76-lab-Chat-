export interface MessageT {
    id:string
    author:string;
    message:string;
    time:string
}

export interface MessageTWithoutId {
    author:string;
    message:string;
    time:string
}