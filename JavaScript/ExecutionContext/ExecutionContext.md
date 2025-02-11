# 실행 컨텍스트, Execution Context
## 실행 컨텍스트 란
> 자바스크립트 코드의 실행 방식을 정의해놓은 객체
실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다.

1. 사용자가 웹 페이지에 처음 접근할 때, 사용중인 브라우저의 자바스크립트 엔진이 자바스크립트 파일을 스캔한다.
2. 스캔이 완료되면 스크립트의 모든 코드를 변환하고 실행하는 과정을 관리하는 `실행 컨텍스트`라는 환경이 생성된다.
3. 이 **환경`Execute Engeine`** 은 실행할 코드에 전달할 정보들을 담고있는 객체라고 볼 수 있다.

JS의 코드 진행(`scope``hoisting``this``function``closure`) 동작 원리를 담고 있다.
모아진 EC(Excute Engine)를 콜스택에 적재하여 코드의 실행 순서와 환경을 보장한다.

각각의 EC는 활성화되는 시점에 해당 컨텍스트 내부의 선언된 변수들을 위로 끌어 올리고(hoisting), 외부의 환경정보를 구성하고, this값을 설정하는 등의 동작을 수행한다.

이와 같은 정보들을 형상화하고 구분하기 위해 실행 컨텍스트를 객체의 형태로 보관한다.

## 실행 컨텍스트의 진행
```js
var a = 'aa'

function first() {
  console.log('this is First.');
}

function second() {
  console.log('this is second');
  first();
}

second();
// this is second
// this is first
```
`second()`를 실행시키기 전에 이미 웹브라우저에서 이 함수를 읽었을 것이다.
![](https://velog.velcdn.com/images/aburger/post/cef4d391-a771-4603-b69f-cfe93056e2b7/image.png)
1. 전역 컨텍스트가 생성되어 콜 스택에 우선 푸시된다.
2. `second()`함수를 호출하면, 해당 함수의 새 실행 컨텍스트가 되어 콜 스택의 최 상단에 푸시된다.
3. `second()`내부에서 `first()`를 호출하고, `first`의 실행 컨텍스트 또한 콜 스택에 푸시된다.
4. `first` 함수가 실행 후 종료되면, 해당 실행 컨텍스트는 콜 스택에서 팝(pop)되며 사라진다.
5. 이후 `second`함수가 실행되고 마찬가지로 콜 스택에서 실행 컨텍스트가 삭제된다.
6. 최종적으로 전역 컨텍스트도 스택에서 팝되며, 프로그램의 실행이 종료된다.

> 전역 컨텍스트(Global Context)
- `Global Context`란 스크립트 전체에서 접근할 수 있는 가장 최상위의 실행 환경이다.
- 전역 컨텍스트에서 정의된 변수, 함수는 어디서든 접근할 수 있다.
- 브라우저에서는 window, Node.js는 global 객체로 관리한다.
- 전역 컨텍스트에서 선언한 변수는 암묵적으로 window 또는 global 객체에 속한다.
```js
const globalVar = 100;
console.log(window.globalVar); //100
```

## 실행 컨텍스트의 구성
실행 컨텍스트는 크게 3가지로 구성되어 있다.
1. Variable Environment
2. Lexical Environment
3. this Binding

### Variable Environment
- `Variable Environment`는 현재 실행 컨텍스트 내의 변수와 함수, 그리고 외부 환경에 대한 정보를 포함한다.
  - 외부 환경이란 `environmentRecord`와 `outerEnvironmentReference`로 구성된다.
  - **`environmentRecord`**는 실행 컨텍스트 내에서 선언된 변수와 함수 선언들의 실제 값을 저장한다.
  - **`outerEnvironmentReference`**는 외부 환경에 대한 참조를 유지한다. 이 참조는 현재 컨텍스트가 위치한 코드의 외부 스코프, 즉 부모 스코프에 대한 정보를 가져온다.
- EC가 최초 생성될 때, `Varialbe Environment`에 이 변수들이 저장되고, 이후 `Lexical Environment`를 형성하기 위해 복사된다.
- `Variable Environment`는 초기화 시점의 상태를 스냅샷으로 유지하며, 후에는 참조만 제공한다.
  - 실행 컨텍스트의 초기 상태를 추적하기에 용이하다.

### Lexical Environment
- `Variable Environment`와 마찬가지로, `Lexical Environment`도 `environmentRecord`와 `outerEnvironmentReference`로 구성된다.
  - **`environmentRecord`**는 실행 중에 코드내에서 발생하는 변화를 실시간으로 반영한다. 이는 블록내의 변수할당이나 함수 표현식과 같은 동적인 활동을 포함한다.
  - **`outerEnvironmentReference`**는 `Lexical Environmnet`의 외부 스코프에 대한 참조를 제공한다. 이는 현재 컨텍스트가 어느 컨텍스트와 연결되어 있는지 나타낸다.
- `Lexical Environment`는 코드 실행 중에 발생하는 동적인 활동을 반영함으로서 `Variable Environment`와 차별된다. 이를 통해 실행 컨텍스트의 실시간 상태를 보다 정확하게 반영하게 된다.

#### Environment
- environmentRecord
  - 함수 내의 코드가 실행되기 전에,현재 컨텍스트에 관련된 모든 식별자 정보들이 저장된다.
    - 식별자 정보: 매개변수의 이름, 함수 선언, 변수 명 등
    - 이 과정을 통해 JS엔진은 코드 실행전에 해당 환경의 식별자들은 인지하게 된다.: `Hoisting`
    - `Hoisting`은 코드에서 선언들을 먼저 처리하고 나중에 할당을 수행하는 Javascript의 동작을 추상화한 개념이다.
      - 함수 선언문은 전체가 hoisting되지만, 함수 표현식은 이름만 호이스팅되고, 함수 본문은 실행 흐름이 위치에 도달했을 때 처리된다.
- outerEnvironmentReference
  - 현재 컨텍스트의 상위 스코프를 참조한다.
  - 다시 말해, 현재 `envrionmentRecord`의 외부에 있는 `Lexical Environment`를 참조하게 되는 것이다.
  - 이를 통해 해당 EC를 생성한 함수의 외부 환경에 접근할 수 있다.
  - 코드에서 변수를 찾을 때, 현재 컨텍스트의 `Lexical Environment`를 먼저 검색하고, 그 곳에서 찾지 못하면 `outerEnvironmentReference`를 통해 상위 스코프를 검색한다.
    - 이 검색은 전역 컨텍스트의 `Lexical Environment`에 도달할 때까지 계속되며, 결국 해당 변수를 찾지 못하면 `undefined`를 반환한다.

#### EX
```js
const hello = "Hello World!";

const personInfo = () => {
  const personA = {
    age: 20,
    sex: "male",
  };
  const personB = {
    age: 25,
    sex: "female",
  };
  console.log(hello, personA, personB);
};

personInfo(); // Hello World! {age: 20, sex: "male"} {age: 25, sex: "female"}

console.log(hello, personA, personB); // HelloWorld!
//Reference Error: Can't find variable: personA
```
`personInfo` 안에서는 `hello``personA``personB` 변수를 모두 사용할 수 있다.
`hello`는 함수 밖에서 선언되었으며, 함수 내부에서도 접근이 가능하다:
- 이는 `personInfo()`의 `outerEnvironmentReference` 덕분이다.
`personA`와 `personB`는 `personInfo()`내부에서 선언 되었으며, 함수 외부에서는 접근할 수 없다.
- 이 변수들은 `personInfo()`의 `Lexical Environment`내부에 존재하며, 이 함수가 끝나면 더 이상 접근할 수 없다.


### this Binding
#### 바인딩, Binding이란?
프로그램에서 바인딩은 식별자(변수, 함수 명 등)를 그들이 대표하는 값과 연결해주는 과정이다.
변수 선언은 변수 이름을 메모리 상의 주소와 연결한다.
`this`바인딩은 특별한 경우로, `this`라는 식별자와 가리키는 객체를 연결한다.

#### EX
```js
// JS의 this는 기본적으로 window객체를 가르킨다.
// 'strict mode'에서는 this가 undefined로 설정된다.
// 1. 일반 함수의 this
const first = fucntion() {
  console.log(this);
};
first(); // window or undefined(strict)

// 2. 메서드의 this
const obj = {first};
obj.first(); // {first: $f$ first}

// 3. call을 사용한 this 호출
// this는 call의 첫 번째 인자로 명시적으로 지정된 객체를 가르킨다.
first.call({a: 'kim'}); // {a: 'kim'}

// 4. 생성자 함수 호출
// this는 새로 생성된 인스턴스를 가르킨다.
new first(); // first{}

// 5. 화살표 함수
// 화살표함수는 this를 자체적으로 바인딩하지 않으며, 정의된 상위 스코프의 this를 사용한다.
cosnt arrowFunc = () => {
  console.log(this);
}
arrowFunc(); // 상위 스코프의 this
```
상위 객체를 참조한다는 개념은 `Lexical Scope`와 같지만, `Lexical Scope`는 그 함수의 위치에 따라 결정되는 반면, `this`는 함수가 위치 뿐 아니라 함수의 선언 및 호출 방식에도 영향을 받는다.
> this는 따로 공부를 해야 할 필요가 있다.

**참조**
>https://www.nextree.io/execution-context/#:~:text=전역%20컨텍스트는%20코드%20내부,활성화된다고%20이해할%20수%20있습니다.
https://velog.io/@kados22/FE-기술-면접-실행-컨텍스트가-무엇인가요
