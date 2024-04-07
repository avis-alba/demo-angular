import { MatDateFormats } from '@angular/material/core';
import { environment } from '../../environments/environment.development';

export const POSTS_URL: string = `${environment.apiUrl}posts`;

export const MOMENT_DATE_FORMATS: MatDateFormats = {
    
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMMM Y',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM Y'
    }
  };
  
  export const ERROR_MESSAGES: { [key: string]: string } = {

    required: 'Поле обязательно для заполнения',
    maxLength: 'не может быть длинее 50 символов',
    minLength: 'не может быть короче 8 символов',
    maxLengthPost: 'не может быть длинее 500 символов',
    maxLengthTitle: 'не может быть длинее 100 символов',
    minAmount: 'Введите число больше 0',
    allowedChar: 'может содержать только буквы, цифры, пробелы и символы .,-\'()',
    notAllowedChar: 'не может содержать только символы или пробелы',
    notAllowedEnding: 'не может начинаться/заканчиваться символом или пробелом',
    dateFormat: 'Введите дату в формате ДД.ММ.ГГГГ',
    minDate: 'Введите дату не ранее 01.01.1900',
    maxDate: 'Вам должно быть не менее 18 лет',
    emailFormat: 'Введите email в формате inbox@mail.com',
    passwordMatch: 'Пароли не совпадают, повторите ввод',
  };

export const LOADING_MESSAGES: { [key: string]: string } = {

    loading: 'Загрузка данных',
    loadingError: 'Ошибка загрузки, попробуйте снова!',
    addError: 'Не удалось добавить пост, попробуйте снова',
    editError: 'Не удалось отредактировать пост, попробуйте снова',
    deleteError: 'Не удалось удалить пост, попробуйте снова',
    noData: 'Нет данных'
}

export const BUDGET_CATEGORIES: { income: string[], outcome: string[] } = {

  income: ['Работа', 'Продажа вещей', 'Подарки', 'Фриланс', 'Квартира'],
  outcome: ['Еда', 'Техника', 'Одежда', 'Развлечения', 'Квартира']
}