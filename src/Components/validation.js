const nameValidation = (name) => {

    if (name.length < 3) {
        return 'Full name must be at least 3 characters long.';
    }
    if (name.length > 100) {
        return 'Full name cannot exceed 100 characters.';
    }
    if (!/^[A-Za-z .]+$/.test(name)) {
        return 'Only alphabetic characters, spaces, and dots are allowed.';
    }
    else {
        return 'valid';
    }
}

const emailValidation = (email) => {

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    } else {
        return 'valid';
    }
}

const numberValidation = (number) => {

    let phoneRejex = /^\d{10}$/;

    if (!phoneRejex.test(number)) {
        return 'Please enter a 10-digit number.';
    } else {
        return 'valid';
    }
}

export { nameValidation, emailValidation, numberValidation };