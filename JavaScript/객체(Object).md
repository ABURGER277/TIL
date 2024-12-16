# 객체 Object
## 자료형 data type
자바스크립트는 기본적으로 8개의 자료형이 있다.
이 중 일곱개는 오직 하나의 데이터만 담을 수 있어서 `원시형(primitive type)`이라 부른다.
1. `string` 문자열 데이터
2. `number` 정수, 부동수소점을 포함한 숫자 데이터
   1. `NaN` Not a Number
   2. `Infinity` 무한대를 나타내는 숫자 값
3. `bigint` 큰 정수를 표현하는 타입
   1. `n`을 숫자 뒤에 붙여 생성한다.
   2. EX) `const bigIntNum = 1234567890123456789012345678901234567890n;`
4. `boolean` 논리타입(참 혹은 거짓)
5. `undefined` 값 할당이 되지 않은 변수의 타입. 기본적으로 초기화 되지 않은 변수는 `undefined`값을 가진다.
6. `null` 의도적으로 값이 없음을 나타내는 타입
   1. **`typeof null`은 `object`를 반환하지만, 이는 자바스크립트 설계 상 오류이다.** ~~고치기 너무 늦음~~
7. `symbol` 고유하고 변경 불가능한 식별자를 생성하기 위한 타입
   - 주로 객체의 프로퍼티 키로 사용된다.
   ```js
  const uniqueId = Symbol('id');
  const anotherId = Symbol('id');
  console.log(uniqueId, anotherId, uniqueId === anotherId);
  // Symbol(id), Symbol(id), false
  console.log(typeof uniqueId);
  // symbol
   ```

이 일곱가지 자료형 외의 자료형은 전부 **참조 자료형(`refference type`)**이다.

## 객체와 참조 자료형
자바스크립트에서 **참조 타입(Reference Type)**은 **객체(Object)**와 동일한 개념으로 취급된다.
참조 타입은 모두 객체(Object)기반 데이터이며, 함수, 배열 등등 전부 `Object`의 하위 타입이다.

1. 배열(`Array`)
  1. 배열은 **인덱스를 키(key)**로 사용하여 값을 저장하는 객체
  2. 배열은 `Array`라는 내장 객체의 인스턴스
```js
const arr = [1,2,3];
console.log(typeof arr); // "object"
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
```

2. 함수(`Function`)
  1. 함수는 호출 가능한(callable) 객체다.
  2. 자바스크립트에서 함수는 Function 객체의 인스턴스다.
  3. 함수는 특별한 속성과 동작(예: call, apply)을 가진 객체로 동작한다.
```js
function myFunc() {}
console.log(typeof myFunc); // "function"
console.log(myFunc instanceof Function); // true
console.log(myFunc instanceof Object); // true
```

3. 객체(Object)의 범위
`Object`는 자바스크립트에서 모든 참조 타입의 최상위 부모다. 배열, 함수, 그리고 사용자 정의 객체 등은 모두 `Object`를 상속합니다.
```js
const obj = {};
const arr = [];
const func = function() {};

console.log(obj instanceof Object); // true
console.log(arr instanceof Object); // true
console.log(func instanceof Object); // true
```
---
## 객체
### 객체의 구조
객체는 **중괄호**`{...}`를 이용해 만들 수 있다.
중괄호 안에는 `키(key) : 값(value)`쌍으로 구성된 프로퍼티(`property`)를 여러개 넣을 수 있으며,
`key`엔 문자형, `value`엔 자료형이 허용된다.

### 객체의 선언
객체를 만드는 방법에는 두 가지가 있다.
```js
let userA = new Object(); // '객체 생성자' 문법
let userB = {}; // '객체 리터럴' 문법
```
중괄호`{...}`를 이용해 객체를 선언하는 것을 *객체 리터럴(`object literal`)* 이라고 부른다.
객체를 선언할 땐 주로 리터럴 문법을 사용한다.

### 리터럴과 프로퍼티
중괄호 `{...}`안에는 `키: 값`쌍으로 구성된 프로퍼티가 들어간다.
```js
let user = {
   name: "John",
   age: 30
}
```
콜론`(:)`을 기준으로 왼쪽엔 키가, 오른쪽엔 값이 위치한다.
프로퍼티 키는 프로퍼티 `이름` 혹은 `식별자`라고도 부른다.

객체 `user`에는 두 프로퍼티가 있다.
1. "name": "John"
2. "age": 30

**프로퍼티 키를 알고 있다**면 점 표기법(`dot notation`)을 이용해 **프로퍼티 값을 읽는 것이 가능**하다.
```js
console.log(user.name);
console.log(user.age);
```

또한 객체에 프로퍼티를 신규 `추가` 혹은 `삭제`가 가능하다.
```js
// 추가
user.isAdmin = true;
// 삭제
delete user.age;

console.log(user); // { name: 'John', isAdmin: true }
```

**여러 단어를 조합**하여 프로퍼티 키를 만든 경우엔 키를 따옴표로 묶어줘야 한다.
```js
let user = {
   name: "John",
   age: 30,
   "like birds": true // 복수의 단어는 따옴표로 묶어줘야 한다.
}
```

> 상수(const)객체도 수정이 가능하다!
>> const객체도 값을 수정할 수 있음에 주의하자

```js
const user = {
   name: "John",
};

user.name = "Peter"; // (*)
console.log(user.name); // Peter
```
> (*)로 표시한 줄이 오류를 일으킬 것처럼 보이지만 그렇지 않다.
> `const`는 `user`의 값(주소)을 고정하지만, 그 내용은 고정하지 않는다.
> > `const`는 `user = ...`를 전체적으로 설정하려 할 때에만 오류가 발생한다.
>
> 상수 객체 프로퍼티를 만드는 또 다른 방법이 있기는 하지만, 이는 프로퍼티 플래그와 설명자에서 배워보자.

### 객체의 대괄호`[]`표기법
여러 단어를 조합해 프로퍼티 키를 만든 경우
```js
user.likes birds = true; // syntax error
user."likes birds" = true; // syntax error
```
`.`표기법을 사용할 수 없다.
`.`표기법은 **유효한 변수 식별자**인 경우에만 사용할 수 있으며, 유효한 변수 식별자에는 다음과 같은 특징이 있다.
1. 공백을 사용할 수 없다.
2. 숫자로 시작하지 않아야 한다.
3. `$`와 `_`를 제외한 특수 문자가 없어야 한다.

이렇게 키가 **유효한 변수 식별자**가 아닌경우 대괄호 표기법`[square bracket notation]`방법으로 표기할 수 있다.
대괄효 표기법은 키에 어떤 문자열이 있던지 상관없이 동작한다.
```js
let user = {};

// set
user["like birds"] = true;
// get
console.log(user["like birds"]); // true
// delete
delete user["like birds"]; // true
```

`대괄호 표기법`을 사용하면 아래 예시처럼 **변수를 키로 사용**할 수 있다!
```js
let key = "like birds";

user[key] = true;
console.log(user[key]);
```

변수 `key`는 런타임에 평가되기 때문에 사용자 입력이 변경되면 값이 유연하게 변경된다.

```js
const market = {
   apple: 9,
   orange: 10,
   melon: 4,
}

const menu = ["apple", "orange", "melon"];

console.log(menu[0]); // apple
console.log(market[menu[0]]); // 9

//아니면 이런식으로도 사용 가능하다.
let fruit = prompt("search Fruit")
// 프롬프트 창에 melon 입력
console.log(market[fruit]); // 4
```

### 계산된 프로퍼티
객체를 만들 때 객체 리터럴 안의 `프로퍼티 키`가 대괄호`[]`로 둘러싸져 있다면,
이를 계산된 프로퍼티(`computed propert`)라고 한다.
```js
let fruit = prompt('어떤 과일을 구매하시겠습니까??');
let count = prompt('몇 개 구매하시겠습니까??');

let bag = {
   [fruit]: count
}

console.log(`${fruit}을(를) ${bag[fruit]}개 구매합니다.`);
```
대괄호 표기법은 프로티의 이름과 값의 제약을 없애준다.
그러나 작성하기 까다로우며, 일반적으로 `. 표기법`을, 복잡한 상황이 발생할 경우 `[] 표기법`으로 바꾸는 경우가 많다.

### 단축 프로퍼티
프로퍼티 값을 기존 변수에서 받아와 사용하는 방식이다. 바로 위 예제와 같지만 다른 방식으로도 사용해보자.
```js
function makeUser(name, age) {
   return {
      name: name,
      age: age,
   }
}

let user = makeUser("John", 30);
console.log(user);
//{ name: 'John', age: 30 }
```

이렇게 변수를 사용해 프로퍼티를 만드는 경우는 꽤 흔하다.
이런 경우 **`프로퍼티 값 단축 구문(property vlaue shorthand)**를 사용하며 익숙해지도록 노력해보자.
```js
function makeUser(name, age) {
   return {
      name, // name: name 과 같다.
      age, // age: age 와 같다.
   }
}

function makeMale(name, age) {
   return {
      name,
      age,
      // 일반 프로퍼티와 단축 프로퍼티의 혼용도 가능하다.
      sex: "male"
   }
}
```

### 프로퍼티 이름의 제약사항
변수이름에는 제약사항이 있었다.
**예약어**를 사용하면 안되는데 이에는 `for`, `let`, `return`등이 있다.
그러나 객체 프로퍼티엔 이런 제약이 없다. 즉, 예약어를 키로 사용 가능하다는 말이다.
```js
let obj = {
   for: 1,
   let: 2,
   function: 3,
   const: 4,
   return: 5,
}

console.log(obj.for + obj.return + obj.function); // 9
```
또한 `프로퍼티 키` `문자형`이나 `심볼형`이 아니라면 자동으로 문자열로 형 변혼된다.

```js
let obj = {
   true: "testBool",
   0: "testNum",
}

console.log(obj[true], obj["true"], obj[0], obj["0"])
console.log(obj.true);
// testBool testBool testNum testNum
// testBool
```
이와 같이 객체 프로퍼티 키에 쓸 수 있는 문자열에는 제약이 없다.
그러나 **역사적인 이유** 때문에 특별 대우를 받는 이름이 있다.
바로, `__proto__`다.
```js
let obj = {};
obj.__proto__ = 5;
console.log(obj.__proto__);
// [object Objcet]
```
원시값 `5`를 할당하였지만 무시된다.
이는 `프로토 타입`, `프로토 타입의 상속`등 을 공부해야 한다.

---
### `in`연산자로 프로퍼티의 존재 여부 확인하기
자바스크립트 객체의 중요한 특징 중 하나는 다른 언어와는 달리, 존재하지 않는 프로퍼티에 접근하려 해도 **에러가 발생하지 않고** `undefined`를 반환 한다는 것이다.
```js
let user = {};
console.log(user.address === undefined); // true
// 프로퍼티가 존재하지 않음을 나타낸다.
```
이렇게 undefined와 비교하는 것 이외에도 `in`연산자를 통해 프로퍼티 존재 여부를 확인 가능하다.

문법은 다음과 같다.
```js
"key" in object
```
예시:
```js
let user = {age: 10};
let key = "age";

console.log(key in user); // true
```
:question: 그냥 `undefined`랑 비교해도 되지않나?
- 대부분의 경우 일치 연산자(`===`)를 통해서 프로퍼티 존재 여부를 확인하는 방법은 잘 작동한다.
- **그러나, 이 방법이 실패할 때가 있다.**
```js
let obj = {
  test: undefined
};

alert( obj.test );
// 값이 `undefined`이므로, 얼럿 창엔 undefined가 출력됩니다. 그런데 프로퍼티 test는 존재합니다.

alert( "test" in obj );
// `in`을 사용하면 프로퍼티 유무를 제대로 확인할 수 있습니다(true가 출력됨).
```
즉, 프로퍼티는 존재하나 값이 `undefined`라면 `===`연산자와 `in`연산자의 출력값이 다르다.

상황에 맞추어서 사용하면 유용할것 같다.

---
### `for...in` 반복문
`for..in` 반복문을 사용하면 객체의 모든 키를 순회할 수 있다. `for..in`은 앞서 학습했던 `for( ; ; )` 반복문과는 완전히 다르다.
```js
for(key in object) {
   // 각 프로퍼티 키(key)를 이용하여 본문(body)를 실행한다.
}
```
예시:
```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // 키
  console.log(key)  // name, age, isAdmin
  // 키에 해당하는 값
  console.log(user[key]) // John, 30, true
}
```
`key`가 들어간 곳을 `반복 변수명`이라고 하는데 이는 자유롭게 정할 수 있다.
`for(let abc in user)` 이렇게 사용해도 된다.


### 객체 정렬 방식
객체와 객체 프로퍼티를 다루다 보면 한 가지 의문이 들 수 있다.
:question: `프로퍼티`에 순서가 있을까...?
- 반복문은 프로퍼티를 추가한대로 실행될까?
- 순서가 항상 동일할까?

답은 간단하다.
객체는 **`특별한 방식`으로 정렬된다.**
정수 프로퍼티(`integer property`)는 자동으로 정렬되며,
그 외의 프로퍼티는 객체에 추가한 순서 그대로 정렬된다.

예시:
```js
let codes = {
  "49": "독일",
  "41": "스위스",
  "44": "영국",
  // ..,
  "1": "미국"
};

for (let code in codes) {
  console.log(code); // 1, 41, 44, 49
}
```
프로퍼티 키가 정수형이기에 `프로퍼티`가 `1, 41, 44, 49`로 자동정렬 되어 출력된 것이 확인된다.

:question: 키가 정수가 아니라면?
예시:
```js
let user = {
  name: "Harry",
  firstname: "Potter"
};
user.age = 20; // 프로퍼티를 하나 추가합니다.

// 정수 프로퍼티가 아닌 프로퍼티는 추가된 순서대로 나열됩니다.
for (let prop in user) {
  console.log( prop + ":" + user[prop] );
}
// name:Harry
// firstname:Potter
// age:20
```
만약 숫자 데이터를 추가된 순서대로 출력하고 싶다면?
각 나라번호가 정수로 취급되지 않도록 **속임수**를 쓸 수 있다.
```js
let codes = {
  "+49": "독일",
  "+41": "스위스",
  "+44": "영국",
  // ..,
  "+1": "미국"
};

for (let code in codes) {
  console.log( +code ); // 49, 41, 44, 1
}
```
>  +code는 **단항 플러스 연산자 (Unary Plus)**다.
>> 이 연산자는 문자열을 숫자로 변환하는 역할을 한다.
>> `for...in`을 사용하면 객체의 키(`key`)는 항상 문자열로 반환되는데,
>> `+code`를 통해 문자열을 숫자로 변환하고 있다.
