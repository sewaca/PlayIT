## CHECK USER
description: 
  Проверяет был ли до этого зарегистрирован ли пользователь
method: GET 
path: user/check
params: {
  id: number; // VK ID пользователя
}
response: boolean; // true если зарегистрирован. Иначе false
example: http://localhost/user/check?id=66382174

--------------------------------------------------------------------------

## GET USER INFO
description: 
  Получает информацию о пользователе по VK ID 
method: GET
path: user/get
params: {
  id: number; // VK ID пользователя
}
response: {
  fname: string;
  lname: string;
  avatar: string; // URL
  fak: string;
  age: number;
  status: string;
  about: string;
  interests: string;
  progress: number;
  balance: number;
}
example: http://localhost/user/get?id=66382174

--------------------------------------------------------------------------

## CHANGE USER INFO
description:
  Запрос используется для изменения данных о пользователе
  Все поля кроме id могут буть null, т.е. информация по этим полям не изменяется
method: PUT
path: /user/change
params: {
  id: number;
  fname: string | null;
  lname: string | null;
  avatar: string | null; // URL
  fak: string | null;
  age: number | null;
  status: string | null;
  about: string | null;
  interests: string | null;
  progress: number | null;
  balance: number | null;
}
example: http://localhost/user/change

--------------------------------------------------------------------------

## GET PEOPLE NEAR
description: 
  Получает следующего пользователя в подборе в тиндере
method: GET
path: /peopleNear/get
params: {
  id: number; // VK ID пользователя
}
response: {
  id: number; // VK ID
  avatar: string; // url картинки
  fname: string;
  lname: string;
  fak: string;
  description: string; // описание профиля тиндер
}
example: http://localhost/peopleNear/get?id=66382174

--------------------------------------------------------------------------

## LIKE PEOPLE NEAR
description: 
  Ставит лайк предложенному пользователю
method: POST
path: /peopleNear/like
params: {
  id: number; // VK ID пользователя, который лайкнул
  liked: number; // VK ID пользователя, которого лайкнули
}
example: http://localhost/peopleNear/like

--------------------------------------------------------------------------

## 