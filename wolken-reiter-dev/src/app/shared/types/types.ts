export enum FormBreakPoints {
  LARDGE = "75vw",
  SMALL = "35vW",
}

export interface SignupData {
  name: string,
  surname: string,
  email: string,
  phone: string,
  passwordGroup: {
    password: string,
    r_password: string,
  }
}

export interface LoginData {
  email: string,
  password: string,
}

export interface AccessTokenData {
  expiresAt: Date,
  accessToken: string
}
export interface jwtData {
  accessTokenData: AccessTokenData
  refreshToken: string
}

export interface UserData {
  id: number,
  name: string,
  surname: string,
  email: string,
  verified: boolean,
  role: string
}

export interface Token {
  token: string,
}

export interface EmailExistsResponse {
  emailExists: boolean,
}

export interface EmailNotExistsResponse {
  emailNotExists: boolean,
}

export interface Email {
  email: string,
}

export interface UserCreatedResponse {
  userCreated: boolean,
}

export enum FormStaus {
  valid = 'VALID',
  invalid = 'INVALID',
}

export interface PhoneCode {
  code: string,
  dial_code: string,
  flag: string,
  name: string,
}

export interface AbstractProduct {
  name: string,
  price: number,
  description: string,
  user_id: number,
}

export interface Product extends AbstractProduct {
  id: number,
  images: Array<ProductImage>,
}

export interface FormProduct extends AbstractProduct {
  images: Array<string>,
}

export interface EditProduct extends AbstractProduct {
  id: number,
  images?: Array<ProductImage>,
  imageData: ImageData
}

export interface ImageData {
  imageData: {
    addedImages: Array<ProductImage>,
    deletedImageIds: Array<number>,
  }
}

export interface ServerProduct {
  id: number,
  product_id: number,
  user_id: number,
}

export interface ProductImage {
  id: number,
 image: string,
}

export enum Languages {
  EN = "EN",
  DE = "DE",
  RU = "RU",
}
