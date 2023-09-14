import { BudgetPoint } from "./types";

export const outcomeData: BudgetPoint[] = [
   {
    check: false,
    category: 'Еда',
    item: {title: 'Пирожок', description: 'с капустой'},
    amount: 100,
    percent: 0.01
  },
  {
    check: false,
    category: 'Техника',
    item: {title: 'Электронная книга', description: 'Pocket Book 3000'},
    amount: 8000,
    percent: 0.24
  },
  {
    check: false,
    category: 'Одежда',
    item: {title: 'Костюм', description: '100% шерсть'},
    amount: 14000,
    percent: 0.11
  },
  {
    check: false,
    category: 'Развлечения',
    item: {title: 'Зоопарк', description: 'С посещением аквариума'},
    amount: 400,
    percent: 0.09
  },
  {
    check: false,
    category: 'Квартира',
    item: {title: 'Электричество', description: 'По счетчику'},
    amount: 1200,
    percent: 0.05
  },
  {
    check: false,
    category: 'Еда',
    item: {title: 'Курица-гриль', description: 'Целая'},
    amount: 500,
    percent: 0.04
  },
  {
    check: false,
    category: 'Развлечения',
    item: {title: 'Колесо обозрения', description: 'На речном вокзале'},
    amount: 300,
    percent: 0.2
  },
]

export const incomeData: BudgetPoint[] = [
    {
     check: false,
     category: 'Работа',
     item: {title: 'Сайт для зоомагазина', description: 'Разработка корзины'},
     amount: 15000,
     percent: 0.11
   },
   {
     check: false,
     category: 'Продажа вещей',
     item: {title: 'Шкаф', description: 'Книжный, 5 полок'},
     amount: 5000,
     percent: 0.23
   },
   {
     check: false,
     category: 'Подарки',
     item: {title: 'День рождения', description: 'Подарок от коллег'},
     amount: 1000,
     percent: 0.08
   },
   {
     check: false,
     category: 'Фриланс',
     item: {title: 'Лендинг', description: 'Для салона красоты'},
     amount: 7000,
     percent: 0.47
   },
   {
     check: false,
     category: 'Квартира',
     item: {title: 'Аренда', description: 'Счет за август'},
     amount: 30000,
     percent: 0.7
   },
   {
     check: false,
     category: 'Фриланс',
     item: {title: 'Контекстная реклама', description: 'Для собачьего корма'},
     amount: 12000,
     percent: 0.32
   }
 ]