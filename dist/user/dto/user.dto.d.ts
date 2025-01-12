declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class CreateUserDto {
    email: string;
    password: string;
    username: string;
    gender: Gender;
    image: string;
}
export {};
