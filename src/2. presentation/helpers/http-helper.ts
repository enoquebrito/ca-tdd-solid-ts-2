import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})

export const success = (object: any): HttpResponse => ({
  statusCode: 200,
  body: object
})
