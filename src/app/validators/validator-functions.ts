import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minDateValidator(minDate: Date): ValidatorFn { //c'est une fonction qui retourne une fonction de validation "ValidatorFn"
    return (control: AbstractControl): ValidationErrors | null => {
        //parse control value to date
        const date = new Date(control.value);
        // check if control value is superior to date given in parameter
        if (minDate.getTime() < date.getTime()) {
            return null;
        } else {
            //min is the error key
            return { 'min': { value: control.value, expected: minDate } }
        }
    }
}


export function oneOrTwoControlFilledValidator(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value1 = control.get(controlName1)?.value;
        const value2 = control.get(controlName2)?.value;

        if (value1 || value2) {
            return null;
        } else {
            return { 'missing': { expected: value1 | value2 } }
        }
    }
}


export function rangeDateValidator(yearMin: number, yearMax: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const controlValue = control.value;

        if (controlValue >= yearMin && controlValue <= yearMax) {
            return null;
        } else {
            return { 'minMax': { value: control.value, expected: controlValue >= yearMin && controlValue <= yearMax } }
        }
    }
}