export interface ContactInterface {
    _id?: string,
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

export interface BookingInterface {
    _id?: string,
    first_name: string,
    last_name: string,
    order_date: string,
    check_in: string,
    check_out: string,
    notes: string,
    room: RoomInterface,
    status: string,
    room_type: string,
    discount: number
}

export interface BookingItem {
    data: BookingInterface | null;
    status: string;
    error: string | null;
}
export interface BookingsInitialState {
    data: BookingInterface[];
    booking: BookingItem;
    status: string;
    error: string | null;
}

export interface RoomInterface {
    _id?: string,
    room_type: string,
    room_number: number,
    description: string,
    price: number,
    offer: boolean,
    discount: number,
    cancellation: string,
    photos: string[],
    amenities: string[],
    status: string
}

export interface RoomItem {
    data: RoomInterface | null;
    status: string;
    error: string | null;
}
export interface RoomsInitialState {
    data: RoomInterface[];
    room: RoomItem;
    status: string;
    error: string | null;
}

export interface UserInterface {
    _id?: string,
    first_name: string,
    last_name: string,
    email: string,
    start_date: string,
    description: string,
    photo: string,
    phone: string,
    status: string,
    password: string,
    job: string
}

export interface UserItem {
    data: UserInterface | null;
    status: string;
    error: string | null;
}
export interface UsersInitialState {
    data: UserInterface[];
    user: UserItem;
    status: string;
    error: string | null;
}