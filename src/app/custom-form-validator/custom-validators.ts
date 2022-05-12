import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static specialCharacters(control: AbstractControl): ValidationErrors | null {
        let characters = "~`!@#$%^&*()-_+={}[]|\\/:;\"'<>,.?"

        for (let i = 0; i < control.value.length; i++) {
            if(characters.includes(control.value[i])) {
                return {
                    specialCharacters: {
                        character: control.value[i]
                    }
                }
            }
        }
        return null;
    }
}
