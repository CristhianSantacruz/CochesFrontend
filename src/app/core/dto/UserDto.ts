export interface UserDto {
   carId : string;
   email : string;
   exp : number;
   fullname : string;
   iat : number;
   numberCellPhone : string;
   rol : string;
}

export interface UserDtoForgot {
  carID : string,
  active : number,
  email : string,
  fullName : string,
  phone : string,
  password : string,
  rol : string,

}
