export function createControl(confugure, validation) {
    return {
        ...confugure,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validate(value, validation = null) {
    if(!validation) return true
    
    let isValid = true
    
    if(validation.required) {
        isValid = value.trim() !== '' && isValid;
    }
    
    return isValid;

}

export function validateForm(formControls) {
    let isFormValid = true;
    for(let control in formControls) {
        if(formControls.hasOwnProperty(control)){ //Перевірка яка буде давати перевіряти тільки ті поля, які були оголошені в стейті даної властивості
            isFormValid = formControls[control].valid && isFormValid;
        }
    }
    return isFormValid;
}