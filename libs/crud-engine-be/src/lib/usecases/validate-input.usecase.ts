// import { Usecase } from "@api-assistant/commons-be";
// import { InputFieldValidation, InputValidation } from "@api-assistant/endpoints-be";
// import { HttpException, Injectable } from "@nestjs/common";

// interface CoreEngineInputValidatorUsecaseInput {
//     body: {
//         [key: string]: unknown
//     },
//     validation: InputValidation
// }

// @Injectable()
// export class CoreEngineInputValidatorUsecase implements Usecase<CoreEngineInputValidatorUsecaseInput, void> {

//     execute(data: CoreEngineInputValidatorUsecaseInput): Promise<void> {
//         for(let key of Object.keys(data.body)) {
//             this.validateBody(key, data.body[key], data.validation[key])
//         }
//         return Promise.resolve();
//     }

//     private validateBody(key: string, value: unknown, fieldValidations: InputFieldValidation[]) {
//         for(let validation of fieldValidations) {
//             switch(validation.name) {
//                 case 'string-type': {
//                     this.validateStringType(key, value)
//                 }
//             }
//         }
//     }

//     private validateStringType(key: string, value: unknown) {
//         if(typeof value !== "string") {
//             throw new HttpException(`${key} must be string type. Received ${value}`, 400);
//         }
//     }
// }