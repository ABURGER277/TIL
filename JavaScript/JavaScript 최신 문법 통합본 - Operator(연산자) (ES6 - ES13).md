# JavaScript 최신 문법 통합본 - Operator(연산자) (ES6 - ES13)

ES6이후 추가된 문법은 JS코드의 가독성과 생산력을 한 껏 끌어 올려준다.
개인적으로 자주 쓰게되는 순서대로 문법들을 간단한 소개와 함께 정리해보았다.

## `...` Spread Operator 전개 연산자
- `...`
- 객체나 배열의 안의 요소들을 펼치는데 사용한다.(쉽게 설명하자면 그냥 `[]`,`{}` 제거해주는 연산자이다.)
```javascript
let arr = ['Hello', 'Spread!'];
console.log(arr); // ['Hello', 'Spread!']
console.log(...arr); // Hello Spread!
```

- :?:왜 사용하는가.
  - 가장 일반적인 활용 방법은 값을 복사할 때 사용한다.
  - 객체, 배열은 모두 Reference, 참조를 지니고 있다. 따라서 값을 공유하는 객체들중 하나의 value를 수정하면 다른 객체의 value가 변하게 된다.
```javascript
let arr1 = [1,2,3]; // arr1 선언
let arr2 = arr1; // arr2에 arr1을 할당
// 여기서 arr1의 값을 변경하면 어떻게 될까?
//  -> arr1의 값만 변하게 되겠지...?(x)
arr1[0] = 'a';
console.log(arr2); // ['a',2,3] ???
```

- 기존에는 값을 복사하려면 `.slice()`메서드를 작성해야 했지만 `Spread Operator`를 활용하면 유용하다.
```javascript
let arr1 = [1,2,3]; // arr1 선언
let arr2 = [...arr1] // arr2에 arr1의 복사 배열을 할당
arr1[0] = 'a';
console.log(arr2); // [1,2,3] Bingo!
```

## `` `${data}` ``Template Literal
쉽게 말해 문자열 안에 데이터를 쉽게 넣을 수 있게 해주는 문법이다.
- ` `` `백틱 안에 `${data}`형식으로 삽입하여 구현할 수 있다.
```javascript
let key = '이름';
let value = '박수진';
let heroString = `내 ${key}은(는) ${value} 이다.`;
console.log(heroString); // 내 이름은(는) 박수진 이다.
```

## `&&` `||` Short circuit 단축 평가
반환값에 `&&` `||`연산자를 사용해서 반환값을 결정하는데 도움을 준다.
### `||` or
- `A || B`
  - A의 값이 Truthy하다면 왼쪽의 A를 반환한다.
  - A의 값이 Falsy하다면 오른쪽의 B를 반환한다.
```javascript
// Category객체의 currentCategory라는 property가 지정된 상태가 아니라면, 모든 카테고리 List의 0번째 index를 가져오는 함수이다.(vue)
currentCategory() {
	return Category.instance.currentCategory || this.categoryList[0];
}
// 물론 애초에 카테고리 객체에서 currentCategory에 default값을 지정해줘도 되겠지만 API에서 준 데이터에 없으니 까라면 까야한다.
```
위 코드가 보기 불편하다면 아래와 같이 다른 vanillaJS 코드를 만들어보자
```javascript
let obj = {
	dog : 'animal',
	cat : 'animal',
	salmon : 'fish'
}

console.log(obj.dog || 'not data'); // animal
console.log(obj.elephant || 'not data'); // not data
```

### `&&` and
- `A && B`
  - A의 값이 Truthy하다면 오른쪽의 B를 반환한다.
  - A의 값이 Falsy하다면 왼쪽의 A를 반환한다.
```javascript
let obj = {
	dog : 'animal',
	cat : 'animal',
	salmon : 'fish'
}

console.log(obj.dog && 'in data'); // in data
console.log(obj.elephant && 'in data'); // undefined
```
[link](추후 추가)

## `?.` Optional Chaining Operator 옵션 연산자
~~*이걸 연산자라고 할 수 있을까?*~~
- `?.`
  - 프로퍼티가 없는 중첩 객체를 에러없이 안전하게 접근할 수 있다.
  - `A ?. B`에서 A가 `undefined`나 `null`이라면 B를 찾지 않고 undefined를 반환한다.
  - 그렇지 않다면 B에 접근하여 최종값을 반환한다.
    - **진짜 자주 사용한 코드다.**
```javascript
const person = {
  boyA : {
    name: 'Tom',
    Age: '20'
  }
}
console.log(person.boyA.name); // Tom
console.log(person.boyB.name); // Error!! Cannot read properties
// 여기서 에러가 나지 않게하려면?
// 조건문을 걸 코드를
if (person.boyB) {
  console.log(person.boyB.name); // undefined
}
// optional Chaining으로 짧고 직관적으로 변환
console.log(person.boyB?.name); // undefined
```
예를 들면,
블로그 독자가 url에 나한테 없는 주소로 억지로 이동해서 접근하는거에 대해 예외처리를 당연히 해줘야 하는데
```javascript
if(category === javascript) return blog.javascript.posts;
if(category === css) return blog.css.posts;
if(category === python) return blog.python.posts;
// 이런식으로 없는 카테고리에 대한 예외없이 하드코딩해도 되지만
// 아래와 같이 동적 데이터에 접근하여 한줄로 만들수 도 있다.

return blog.[category]?.posts
```
이런식으로 할 수 있다. ~~근데 블로그 코드 이렇게 안 짜놓음~~4
`?.()`로 함수접근, `?.[]`로 객체의 key로 접근도 가능하다.
[link](추후 추가)

## `??` Nullish Coalescing Operator 널 병합 연산자
- `A ?? B`
- **아주아주아주아주 심플하고 유연하게** A값이 없다면 B를 반환한다.
  - `||`와 흡사해보이나 아주 큰 차이가 있다.
```javascript
const A = null;
console.log(A || 'notData'); // notData
console.log(A ?? 'notData'); // notData
// A가 null이니까 'notData'를 출력하는 것은 당연하다.
// 그러나 '??'가 심플하게 반환한다는 예제를 보자면
const num = 0;
console.log(num || 'notNumber'); // notNumber
console.log(num ?? 'notNumber'); // 0
// '||'와 '??'의 출력값이 서로 다르다.
// '||'는 falsy한 값을 데이터로 인식하지 않지만,
// '??'는 0, false, '' 값을 데이터로 인식한다.
// ''로 test를 한번 더 해보자.
const emptyString = '';
console.log(emptyString || 'it\'s empty!'); // it's empty!
console.log(emptyString ?? 'it\'s empty!'); //
```
**`||` 와 `??`의 차이를 인식하고 적재적소에 활용하도록 하자.**

## Logical Operators and Assignment Expressions 논리연산자와 할당표현법
`&&=`, `||=`
Assignment용어가 익숙하지 않을 수 있지만 사실
`num += 1`에서 `=`을 assignment라고 한다.
- `+=`을 영어로 Addition assignment라고 한다.
즉, 이 연산자는 위의 Short circuit 단축평가의 `+=`같은 버전인 셈이다.
### `&&`
```javascript
let oldValue = 'oldOne';
let newValue = 'newOne';
// 아래 3개의 표현방식은 모두 동일하다.
if(oldValue) { oldValue = newValue; }
oldValue && (oldValue = newValue);
oldValue &&= newValue;
```
### `||`
```javascript
let oldValue;
let newValue = 'newOne';
// 아래 3개의 표현방식은 모두 동일하다.
if(!oldValue) { oldValue = newValue; }
oldValue || (oldValue = newValue);
oldValue ||= newValue;
```

## Logical nullish assignment 널 비교 할당
`??=`
한글로 해석하기가 더 힘들다.
그냥 위의 `??`연산자에 assignment표현을 더해준 연산자다.
- `A ??= B`에서 A가 `null`, `undefined`면 B를 할당한다.
```javascript
let 박수진 = {region:'korea', age:20};
console.log(박수진.region ??= '난민'); // korea
console.log(박수진.wife ??= '미혼'); // 미혼
console.log(박수진.comp ?? '백수'); // 백수
console.log(박수진); // {age:20, region:"korea", wife:"미혼"}
// ??와 ??=의 차이는 값 할당 여부이다.
```

## 지수연산자
- `**`곱셈기호를 두번쓰면 제곱으로 처리된다.
```javascript
2**10 // 1024
```
## Numeric Seprator
- 코드에서 100000000000과 같은 큰 단위 숫자의 가독성을 높일 수 있게 언더바`-`로 단위를 구분할 수 있는 표현이다.
  - ex) 100_000_000_000과 같이 천 단위로 끊어 표현할 수 있다.
  - `_`구분자는 그냥 코드에서 보기 편하기 위해 만드는 것이지 출력되는 값은 그대로이다.

```javascript
console.log(100_000_000_000 + 10_000); // 100000010000
console.log(1000_00_0_0_0000 + 100_00); // 100000010000
console.log(typeof(1000_00_0_0_0000 + 100_00)) // number
```
