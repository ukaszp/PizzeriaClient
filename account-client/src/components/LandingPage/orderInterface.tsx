import { number } from "yup"

export interface Order {
    addressId: number
    pizzeriaUserId: number
    dishIds: number[]
}