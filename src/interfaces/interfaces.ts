export interface User {

    id?: string,
    username?: string,
    email?: string,
    password?:string
    diaryIds : string [] | null 
};


export interface Diary {
    id?: string,
    title : string,
    type : 'private' | 'public',
    createdAt : string,
    updatedAt: string,
    userId : string,
    entryId: string,


}