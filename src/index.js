require('fslightbox');
import './styles/style.scss';

class pizzaCheff {
    constructor() {
        this.callbackForm = document.querySelector('.js-callback-form');
        this.usernameEl = document.querySelector('#username');
        this.phoneEl = document.querySelector('#phone');
        this.addressEl = document.querySelector('#address');
        this.modal = document.querySelector('.modal');

        this.callbackForm.addEventListener('input', function (evt) {
            switch (evt.target.id) {
                case 'username':
                    this.checkUsername;
                    break;
                case 'phone':
                    this.checkPhone;
                    break;
            }
        });

        this.callbackForm.addEventListener('submit', this.validateForm.bind(this));
        this.usernameEl.addEventListener('input', this.checkForDots.bind(this));
        this.phoneEl.addEventListener('input', this.checkIfNumbersOnly.bind(this));
    }

    isPhoneValid(phone) {
        const re = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
        return re.test(phone);
    }

    isAddressValid(address) {
        const re = /^[а-я\s.]+?\d+/i;
        return re.test(address);
    }

    isRequired(value) {
        return value === '' ? false : true;
    }

    checkForDots() {
        let val = this.usernameEl.value.replace(/[.]/g, '');
        this.usernameEl.value = val;
    }

    checkIfNumbersOnly() {
        let val = this.phoneEl.value.replace(/\D/g, '');
        this.phoneEl.value = val;
    }

    isBetween(length, min, max) {
        return length < min || length > max ? false : true;
    }

    checkPhone() {
        let valid = false;
        const phone = this.phoneEl.value.trim();
        if (!this.isRequired(phone)) {
            this.showError(this.phoneEl, 'Заполните это поле');
        } else if (!this.isPhoneValid(phone)) {
            this.showError(this.phoneEl, 'Некорректный номер')
        } else {
            this.showSuccess(this.phoneEl);
            valid = true;
        }
        return valid;
    }

    checkAddress() {
        let valid = false;
        const address = this.addressEl.value.trim();
        if (!this.isRequired(address)) {
            this.showError(this.addressEl, 'Заполните это поле');
        } else if (!this.isAddressValid(address)) {
            this.showError(this.addressEl, 'Некорректный адрес')
        } else {
            this.showSuccess(this.addressEl);
            valid = true;
        }
        return valid;
    }

    checkUsername() {
        let valid = false;
        const min = 2,
            max = 25;

        const username = this.usernameEl.value.trim();

        if (!this.isRequired(username)) {
            this.showError(this.usernameEl, 'Заполните это поле');
        } else if (!this.isBetween(username.length, min, max)) {
            this.showError(this.usernameEl, `В имени пользователя должно быть не менее ${min} и не более ${max} символов`)
        } else {
            this.showSuccess(this.usernameEl);
            valid = true;
        }
        return valid;
    }

    showError(input, message) {
        const formField = input.parentElement;
        formField.classList.remove('success');
        formField.classList.add('error');
        const error = formField.querySelector('small');
        error.innerHTML = message;
    }

    showSuccess(input) {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        const error = formField.querySelector('small');
        error.textContent = '';
    }

    validateForm($event) {
        $event.preventDefault();
        let isUsernameValid = this.checkUsername(),
            isPhoneValid = this.checkPhone(),
            isAddressValid = this.checkAddress();

        let isFormValid = isUsernameValid &&
            isPhoneValid &&
            isAddressValid;

        if (isFormValid) {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    username: this.usernameEl.value,
                    phone: this.phoneEl.value,
                    address: this.addressEl.value,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
            this.callbackForm.reset();
            this.modal.classList.add('modal_open');
            setTimeout(this.closeModal.bind(this), 1500);
        }
    }

    closeModal() {
        this.modal.classList.remove('modal_open');
    }
}

new pizzaCheff();