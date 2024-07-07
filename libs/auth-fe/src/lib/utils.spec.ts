import { FormControl, ValidationErrors } from "@angular/forms"
import { strongPasswordValidator } from "./utils"

describe('account utils', () => {

    describe('strongPasswordValidator', () => {

        const MOCK_VALIDATION_ERROR: ValidationErrors = { strongPassword: true }

        it('should return validation error when captial letter is missing', () => {
            expect(strongPasswordValidator(new FormControl("abcdefghi"))).toMatchObject(MOCK_VALIDATION_ERROR)
        })

        it('should return validation error when lower letter is missing', () => {
            expect(strongPasswordValidator(new FormControl("ABCDEFGHI"))).toMatchObject(MOCK_VALIDATION_ERROR)
        })

        it('should return validation error when number is missing', () => {
            expect(strongPasswordValidator(new FormControl("ABCDefghi"))).toMatchObject(MOCK_VALIDATION_ERROR)
        })

        it('should return validation error when length is less than 9 chars', () => {
            expect(strongPasswordValidator(new FormControl("ABCDefg9"))).toMatchObject(MOCK_VALIDATION_ERROR)
        })

        it('should return true when all criteria is met', () => {
            expect(strongPasswordValidator(new FormControl("ABCDefgh9"))).toBe(null)
        })
    })
})