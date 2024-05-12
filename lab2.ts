/* 
   1. Необходимо описать тип Person для того чтобы использовать его в массиве persons и функции logPerson 
 */

// interface User  {
//     name: string;
//     age: number;
//     occupation: string;
// }

// interface Admin  {
//     name: string;
//     age: number;
//     role: string;
// }

// export type Person = User | Admin ;

// export const persons: Person[] /* <- Person[] */ = [
//     {
//         name: 'Max Mustermann',
//         age: 25,
//         occupation: 'Chimney sweep'
//     },
//     {
//         name: 'Jane Doe',
//         age: 32,
//         role: 'Administrator'
//     },
//     {
//         name: 'Kate Müller',
//         age: 23,
//         occupation: 'Astronaut'
//     },
//     {
//         name: 'Bruce Willis',
//         age: 64,
//         role: 'World saver'
//     }
// ];

// export function logPerson(user: Person):void {
//     console.log(` - ${user.name}, ${user.age}`);
// }



// persons.forEach (person =>   logPerson(person));


//------------------------------------------------------------------------------------------------------------


/*
    2. Необходимо исправить ошибки TS
*/

// interface User {
//     type: 'user';
//     name: string;
//     age: number;
//     occupation: string;
// }

// interface Admin {
//     type: 'admin';
//     name: string;
//     age: number;
//     role: string;
// }

// export type Person = User | Admin;

// export const persons: Person[] = [
//     { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
//     { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
//     { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
//     { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
// ];

// export function isAdmin(person: Person) {
//     return person.type === 'admin';
// }

// export function isUser(person: Person) {
//     return person.type === 'user';
// }

// export function logPerson(person: Person)  {
//     let additionalInformation: string = '';
//     if (isAdmin(person)) {
//         additionalInformation = (<Admin> person).role ;
//     }
//     if (isUser(person)) {
//         additionalInformation = (<User> person).occupation;
//     }
//     console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
// }



//------------------------------------------------------------------------------------------------------------


/*
    3. Необходимо описать тип PowerUser (121 строка), который имеет все поля интерфейсов User и Admin (кроме поля type),
    а также имеет поле type со значение "powerUser" (копирование кода запрещено)
*/

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}
interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}
type PowerUser = Omit<User, 'type'> & Omit<Admin, 'type'> & { type: 'powerUser' };
export type Person = User | Admin | PowerUser;
export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    {
        type: 'powerUser',
        name: 'Nikki Stone',
        age: 45,
        role: 'Moderator',
        occupation: 'Cat groomer'
    }
];


//------------------------------------------------------------------------------------------------------------


/*
    4. Необходимо удалить типы AdminsApiResponse и UsersApiResponse, и использовать вместо них тип ApiResponse с обобщенным типом
*/

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin  {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}



const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = {
    status: 'success' | 'error',
    data ?: T[],
    error?: string
};




type AdminsApiResponse = (
    {
        status: 'success';
        data: Admin[];
    } |
    {
        status: 'error';
        error: string;
    }
);

type UsersApiResponse = (
    {
        status: 'success';
        data: User[];
    } |
    {
        status: 'error';
        error: string;
    }
);

export function requestAdmins(callback: (response: ApiResponse<Admin>) => void) {
    callback({
        status: 'success',
        data: admins
    });
}



export function requestUsers(callback: (response: ApiResponse<User>) => void) {
    callback({
        status: 'success',
        data: users
    });
}
