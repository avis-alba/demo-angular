const registrationForm = document.getElementById('registration-form');

const [firstName, lastName, email, birthDay, password, passwordConfirm] = registrationForm.elements;

firstName.minLength = lastName.minLength = '1';
firstName.maxLength = lastName.maxLength = '50';

firstName.pattern = lastName.pattern = '^[A-Za-zА-Яа-яЁё0-9.,\\(\\)\\s\'\\-]+$';

password.minLength = '8';
password.maxLength = '100';
password.pattern = '^[A-Za-zА-Яа-яЁё0-9\\s`!@#№$%^&*\\(\\)_=+\\[\\]\\{\\}:;"\\\|,.\\/<>?~\'\\-]+$';

const currentDate = new Date();
let year = currentDate.getFullYear() - 18;
let month = currentDate.getMonth() + 1;
let day = currentDate.getDate();

if (month < 10) month = '0' + month;
if (day < 10) day = '0' + day;

birthDay.max = `${year}-${month}-${day}`;
birthDay.min = '1900-01-01';

firstName.addEventListener('blur', validateName);
lastName.addEventListener('blur', validateName);
email.addEventListener('blur', validateEmail);
birthDay.addEventListener('blur', validateBirthDate);
password.addEventListener('blur', validatePassword);
passwordConfirm.addEventListener('blur', validatePasswordConfirmation);

function validateName(event) {

	const name = event.target;
	const id = name.id;
	const fieldName = id === 'first-name' ? 'Имя' : 'Фамилия';
	const validity = name.validity;
	const label = document.getElementById(`${id}-label`);
	const errorMessage = document.getElementById(`${id}-error`);

	if (validity.valid) {

		name.classList.remove('invalid');
		name.classList.add('valid');
		label.classList.remove('invalid');
		errorMessage.hidden = true;

		if (name.value.match(/^[\s'.,)-]/) || name.value.match(/[\s'.,(-]$/)) {

			name.classList.remove('valid');
			name.classList.add('invalid');
			label.classList.add('invalid');
			errorMessage.hidden = false;

			errorMessage.textContent = `${fieldName} не может начинаться/заканчиваться символом или пробелом`;
		}

		if (!name.value.match(/[A-Za-zА-Яа-яЁё0-9]+/)) {

			name.classList.remove('valid');
			name.classList.add('invalid');
			label.classList.add('invalid');
			errorMessage.hidden = false;

			errorMessage.textContent = `${fieldName} не может содержать только символы или пробелы`;
		}
	}

	if (!validity.valid) {

		name.classList.remove('valid');
		name.classList.add('invalid');
		label.classList.add('invalid');
		errorMessage.hidden = false;

		if (validity.valueMissing) errorMessage.textContent = 'Поле обязательно для заполнения';
		if (validity.tooLong) errorMessage.textContent = `${fieldName} не может быть длинее 50 символов`;
		if (validity.patternMismatch) errorMessage.textContent = `${fieldName} может содержать только буквы, цифры, пробелы и символы .,-'()`;
	}

	validateForm(name.form);
}

function validateEmail(event) {

	const email = event.target;
	const validity = email.validity;
	const label = document.getElementById('email-label');
	const errorMessage = document.getElementById('email-error');

	if (validity.valid) {

		email.classList.remove('invalid');
		email.classList.add('valid');
		label.classList.remove('invalid');
		errorMessage.hidden = true;

		if (!email.value.match(/(?<=@).+\..+/)) {

			email.classList.remove('valid');
			email.classList.add('invalid');
			label.classList.add('invalid');
			errorMessage.hidden = false;

			errorMessage.textContent = 'Введите email в формате mailbox@example.com';
		}
	}

	if (!validity.valid) {

		email.classList.remove('valid');
		email.classList.add('invalid');
		label.classList.add('invalid');
		errorMessage.hidden = false;

		if (validity.valueMissing) errorMessage.textContent = 'Поле обязательно для заполнения';
		if (validity.typeMismatch) errorMessage.textContent = 'Введите email в формате mailbox@example.com';
	}

	validateForm(email.form);
}

function validateBirthDate(event) {

	const birthDate = event.target;
	const validity = birthDate.validity;
	const label = document.getElementById('birth-day-label');
	const errorMessage = document.getElementById('birth-day-error');

	if (validity.valid) {

		birthDate.classList.remove('invalid');
		birthDate.classList.add('valid');
		label.classList.remove('invalid');
		errorMessage.hidden = true;
	}

	if (!validity.valid) {

		birthDate.classList.remove('valid');
		birthDate.classList.add('invalid');
		label.classList.add('invalid');
		errorMessage.hidden = false;

		if (validity.valueMissing) errorMessage.textContent = 'Поле обязательно для заполнения';
		if (validity.rangeUnderflow) errorMessage.textContent = 'Введите дату не ранее 01.01.1900';
		if (validity.rangeOverflow) errorMessage.textContent = 'Вам должно быть не менее 18 лет';
	}

	validateForm(birthDate.form);
}

function validatePassword(event) {

	const password = event.target;
	const validity = password.validity;
	const label = document.getElementById('password-label');
	const errorMessage = document.getElementById('password-error');

	const passwordConfirm = document.getElementById('password-confirm');
	const passwordConfirmLabel = document.getElementById('password-confirm-label');
	const passwordConfirmError = document.getElementById('password-confirm-error');

	if (validity.valid) {

		password.classList.remove('invalid');
		password.classList.add('valid');
		label.classList.remove('invalid');
		errorMessage.hidden = true;

		let isValid = false;

		const checks = {
			lowercaseLetter: {
				check: password.value.match(/[a-zа-яё]+/),
				message: 'Пароль должен содержать хотя бы одну строчную букву'
			},
			uppercaseLetter: {
				check: password.value.match(/[A-ZА-ЯЁ]+/),
				message: 'Пароль должен содержать хотя бы одну заглавную букву'
			},
			digit: {
				check: password.value.match(/\d+/),
				message: 'Пароль должен содержать хотя бы одну цифру'
			},
			symbol: {
				check: password.value.match(/[`!@#№$%^&*()_=+[\]{}:;"\\|,./<>?~'-]+/),
				message: 'Пароль должен содержать хотя бы один символ'
			}
		};

		for (let checkType in checks) {

			if (checks[checkType].check) {

				isValid = true;

			} else {

				isValid = false;
				errorMessage.textContent = checks[checkType].message;
				break;
			}
		}

		if (!isValid) {

			password.classList.remove('valid');
			password.classList.add('invalid');
			label.classList.add('invalid');
			errorMessage.hidden = false;

		} else if (isValid) {

			password.classList.remove('invalid');
			password.classList.add('valid');
			label.classList.remove('invalid');
			errorMessage.hidden = true;
		}
	}

	if (!validity.valid) {

		password.classList.remove('valid');
		password.classList.add('invalid');
		label.classList.add('invalid');
		errorMessage.hidden = false;

		if (validity.valueMissing) errorMessage.textContent = 'Поле обязательно для заполнения';
		if (validity.patternMismatch) errorMessage.innerHTML = 'Пароль может содержать: буквы, цифры, пробелы и символы<br>`!@#№$%^&*()_=+[]{}:;"\\|,.-/<>?~\'';
		if (validity.tooShort) errorMessage.textContent = 'Пароль должен быть не короче 8 символов';
		if (validity.tooLong) errorMessage.textContent = 'Пароль должен быть не длинее 100 символов';
	}

	if (passwordConfirm.value) {

		if (password.value !== passwordConfirm.value) {

			passwordConfirm.classList.remove('valid');
			passwordConfirm.classList.add('invalid');
			passwordConfirmLabel.classList.add('invalid');
			passwordConfirmError.hidden = false;
			passwordConfirmError.textContent = 'Пароли не совпадают, повторите ввод';

		} else if (password.value === passwordConfirm.value) {

			passwordConfirm.classList.remove('invalid');
			passwordConfirm.classList.add('valid');
			passwordConfirmLabel.classList.remove('invalid');
			passwordConfirmError.hidden = true;
		}
	}

	validateForm(password.form);
}

function validatePasswordConfirmation(event) {

	const passwordConfirm = event.target;
	const label = document.getElementById('password-confirm-label');
	const validity = passwordConfirm.validity;
	const errorMessage = document.getElementById('password-confirm-error');

	const password = document.getElementById('password');

	if (validity.valid) {

		passwordConfirm.classList.remove('invalid');
		passwordConfirm.classList.add('valid');
		label.classList.remove('invalid');
		errorMessage.hidden = true;

		if (passwordConfirm.value !== password.value) {

			passwordConfirm.classList.remove('valid');
			passwordConfirm.classList.add('invalid');
			label.classList.add('invalid');
			errorMessage.hidden = false;
			errorMessage.textContent = 'Пароли не совпадают, повторите ввод';
		}
	}

	if (!validity.valid) {

		passwordConfirm.classList.remove('valid');
		passwordConfirm.classList.add('invalid');
		label.classList.add('invalid');
		errorMessage.hidden = false;

		if (validity.valueMissing) errorMessage.textContent = 'Поле обязательно для заполнения';
	}

	validateForm(passwordConfirm.form);
}

function validateForm(form) {

	let isValid = false;
	const submitButton = form.elements.submit;

	for (let input of form.elements) {

		if (input.type === 'submit') break;

		if (input.classList.contains('valid')) {

			isValid = true;

		} else {

			isValid = false;
			break;
		}
	}

	if (isValid) {

		form.classList.remove('invalid');
		form.classList.add('valid');
		submitButton.disabled = false;

	} else if (!isValid) {

		form.classList.remove('valid');
		form.classList.add('invalid');
		submitButton.disabled = true;
	}
}

registrationForm.onsubmit = function (event) {

	event.preventDefault();
	alert('Форма успешно отправлена');
	location.reload();
}