export interface ContactInterface {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    date: string,
    photo: string,
    status: boolean
}

export interface ContactComment {
    data: ContactInterface | null;
    status: string;
    error: string | null;
}
export interface ContactsInitialState {
    data: ContactInterface[];
    comment: ContactComment;
    status: string;
    error: string | null;
}