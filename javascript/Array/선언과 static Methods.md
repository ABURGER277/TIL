# 자바스크립트 배열
## 선언과 static Methods
### 배열 만들기
#### 배열 생성자
**`new Array()`**
배열은 기본적으로 다음과 같이 선언 할 수 있다.
```js
const arr1 = new Array();
const arr2 = new Array(element0, element1, ... , elementN);
const arr3 = new Array(arrayLength);
```

배열의 선언은 `new`생성자 없이도 선언할 수 있다.
```js
const arr4 = Array();
const arr5 = Array(element0, element1, ... , elementN);
const arr6 = Array(arrayLength)
```

위 예제에서 배열을 생성할 때 `Array()`안에 매개변수를 넣을 수 있는걸 볼 수 있다.
1. 매개변수에 `,`를 사용하여 여러개의 매개변수를 할당해준다면?
```js
const arr10 = Array("H","E","L","L","O");
console.log(arr10); // [ 'H', 'E', 'L', 'L', 'O' ]
console.log(arr10.length); // 5
console.log(arr10[arr10.length - 1]); // 'O'
```

2. 매개변수에 하나의 매개변수만 할당해준다면?
```js
const arr11 = Array(10);
console.log(arr11); // [ <10 empty items> ]
console.log(arr11.length); // 10
console.log(arr11[arr11.length - 1]); // undefined => 실제로는 빈 값이지만 console에 찍어보면 undefined로 출력된다.
console.log(arr11[0] === undefined); // true
```
하나의 정수 매개변수가 할당되면 인자의 길이를 가진 배열을 undefined로 채워서 만들어준다.
그러나 만약 여기서 Array매개변수로 number가 아닌 object를 넣어본다면?
```js
const arr12 = Array("10");
console.log(arr12); // [ '10' ]
console.log(arr12.length) // 1
console.log(arr12[0]) // '10'
```
여러개의 매개변수를 할당해 줄 때처럼 `['10']`이라는 배열객체를 만들어준다.

만약 우리가 `['10']`이 아니라 `[10]` 이라는 하나의 정수를 가진 배열을 만들고 싶다면 어떻게 할까?
```js
const arr12 = [Number("10")];
console.log(arr12); // [10]
console.log(arr12.length); // 1
console.log(arr12[0]); // 10
```
이런식으로 어떻게든 객체화 시켜서 할당해주어야 한다.
근데 아래와 같이 하면 더 편하다.

#### 배열을 리터럴 표기법(literal notation)으로 생성하기
`Javascript`에서 배열은 생성자 뿐 아니라 리터럴 표기법으로 생성할 수 있다.
```js
const fruits = [apple, banana, kiwi];

console.log(fruits[2]); // kiwi
console.log(fruits.length) // 3
```
위에서 본 `[10]`을 만드려면 그냥
```js
const arr1 = [10]
```
이렇게 만들면 된다는 것이다. 매우 편하다.
리터럴 표기법을 통해 배열을 선언 및 할당하면 직관적인 코드 작성이 가능하다.

### 배열의 정적 메서드(static methods)
정적 메서드는 배열 인스턴스가 아닌 Array 생성자 자체에서 호출되는 메서드다.

특징:
1. Array 객체의 정적 메서드로 호출된다. 배열 인스턴스를 통하여 호출할 수 없다.
2. Array 클래스 이름을 통해 호출이 가능하다. 배열 인스턴스를 생성하지 않고도 호출이 가능하다.
3. 주로 배열을 생성하거나 변환하는 구조적 조작을 돕는 유틸리티 기능을 제공한다.

아래에서 사용할 테스트 배열을 만들어보자.
```js
const stringArr = ['H', 'e', 'l', 'l', 'o', '', 'W', 'o', 'r', 'l', 'd', '!'];
const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```
#### Array.isArray()
매개변수 배열이 Array인지 확인하며 Boolean값을 반환한다.
```js
console.log(Array.isArray([1,2,3])); // true
console.log(Array.isArray(stringArr)); // true
console.log(Array.isArray('[]')); // false
console.log(Array.isArray(new Array(5))); // true

// 참고로 타입배열을 isArray로 받아 출력해 보면 false를 반환합니다.
console.log(Array.isArray(new Int16Array([15, 33]))); // false
```
Array형식(format)을 가지고 있지만 Array객체인지 확인이 필요할 때 사용한다.

#### Array.from()
이 함수는 순회 가능`Iterable` 또는 유사 배열 객체(Typed Array)에서 얕게 복사된 새로운 Array 인스턴스를 생성한다.
```js
console.log(Array.from("Goodbye ~")); // ['G', 'o', 'o', 'd', 'b', 'y','e', ' ', '~']
console.log(Array.from([1, 2, 3], (val) => val + val)); // [2, 4, 6]
console.log(Array.from(numberArr, val => val + val)); // [2,  4,  6,  8, 10, 12, 14, 16, 18, 20]
```
`Array.from()`은 예제와 같이 두번째 매개변수로 콜백함수를 넣어 새로운 배열을 반환시킬 수 있다.

#### Array.of()
인자의 수나 유형에 관계없이 가변적인 수의 인자로부터 새로운 Array 인스턴스를 생성한다.
```js
console.log(Array.of('HELLO', 1, 'WORLD', 2, '!', true)); // [ 'HELLO', 1, 'WORLD', 2, '!', true ]
console.log(Array.of()); // []

console.log(Array.of(100)); // [100]
console.log(Array(100)); // [ <100 empty items> ]
```
`Array()`생성자와 다르게 좀 더 `strict`하게 동작하는 배열 생성 함수이다.
개인적으로 리터럴 선언이 더 직관적이지 않나 싶다.
```js
const tmpArr1 = Array.of(77);
const tmpArr2 = [77];

console.log(`tmpArr1: ${tmpArr1}, tmpArr2: ${tmpArr2}`);
// tmpArr1: 77, tmpArr2: 77
```

#### Array.fromAsync()
`Array.fromAsync()` 정적 메서드는 비동기 순회 가능, 순회 가능, 또는 유사 배열 객체에서 얕게 복사된 새로운 Array 인스턴스를 만든다.
**ES2024 표준으로 도입되었으며, 작성일 기준으로서는 사용 빈도가 낮다.**
**최신 브라우저와 Node.js에서만 사용할 수 있어 호환성 문제를 고려하여 작성하자.**

우선 이 함수로 주로 복사해올 객체는 다음과 같다.
- 비동기 순회 가능 객체: ReadableStream, AsyncGenerator, ...
- 순회 가능 객체: Map, Set, ...
- 유사 배열 객체: length속성과 인덱스된 요소가 있는 객체

`Array.fromAsync()`는 다음 동작들을 제외하면 `Array.from()`과 거의 동일하다.
- 비동기 순회 가능 객체를 처리할 수 있다.
- Array.fromAsync()는 배열 인스턴스에 이행하는 `Promise`를 반환한다.
- 비동기 순회 가능 객체로 `Array.fromAsync()`를 호출하면 배열에 추가할 각 요소가 먼저 await된다.
- `mapFn`이 제공되면, 그 입력과 출력이 내부적으로 await된다.

설명을 보고 가장 먼저 떠오르는건
> 뭔가... `Promsie.all`이랑 비슷해 보이는데...
라는 느낌이었다. 실제로 `Promise.all`이나 `Array.from + async&await`를 함께 사용하는 방식으로 대체 할 수 있다.

`AsyncGenerator`, `ReadableStream`같은 비동기 순회 가능 객체를 사용할 때,
그리고 비동기 작업 결과를 배열로 변환하면서 매핑이 필요할 때 사용하기 적합하다.
