# Promise
> https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises
> https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-Promise
> https://springfall.cc/article/2022-11/easy-promise-async-await
## Promise란
JavaScript의 Asynchronous 처리를 위한 `객체`이며, JS의 비동기 처리를 이행하기 위한 프로그래밍 방식 중 하나이다.
Promise등장 전에는 callback함수를 주로 사용했으며, 이 후에는 async Syntax를 사용한다.

Asynchronous?(link)
Callback?(link)
async Syntax?(link)

## 등장 배경
Promise를 알기 전 알아햘 정보
1. JS single thread
2. Asynchronous
3. Callback func()

### single thread
자바 스크립트는 기본적으로 싱글 스레드를 지원하는 언어이다. 즉, 한번에 하나의 작업만 처리할 수 있는 구조를 가지고 있다. 싱글 스레드 구조는 코드가 실행되는 순서를 예측하기 쉽다. 또한 복잡한 동기화 문제가 덜 발생한다는 장점이 있지만, 동시에 여러 작업을 처리해야 할 때는 비효율적일 수 있다.
- 네트워크 요청
- 파일 읽기/쓰기
- 타이머
이와 같이 시간을 소모하는 작업이 있을 경우, 작업이 완료되기 전까지 다른 코드가 실행되지 못하는 **블로킹(blocking)**현상이 발생한다.

### Asynchronous
자바스크립트는 싱글 스레드의 한계(blocking) 극복을 위해 비동기 처리방식을 사용한다.
- 비동기 작업은 실행 중인 작업의 완료를 기다리지 않고, 다음 작업을 실행하도록 설계된다.
- 네트워크 요청, 파일 읽기/쓰기, 타이머 등의 작업을 효율적으로 처리한다.
  - Web API(브라우저 기본 제공 기능)
    - setTimeout, fetch, eventListner, ...
  - Callback Queue
    - 비동기 작업이 완료되면, 관련 작업을 `Callback Queue`에 저장하여 `EventLoop`가 이를 `Call Stack`으로 이동 시킨다.
  - Event Loop
    - `Call Stack`이 비워지면, `Callback Queue`에 있는 작업을 가져와 실행시킨다.

**비동기 작업은 많은 일을 동시적으로 처리하여 비교적 효율적이다. 하지만 어떤 순서로 진행될지 예측하기가 어렵다.**

### Callback Function
비동기 작업 결과들의 순서 처리를 위하여 **콜백 함수(callback function)**을 사용한다.
**Callback 함수란?**
- 함수의 매개변수로 함수를 작성하는 코드방식
- 특정 작업이 완료 된 후 호출되는 함수이다.
- 비동기 작업에서 Callback함수는 결과를 전달받아 후속작업을 수행한다.
**EX**
```js
console.log("1. 네트워크 요청 시작");
setTimeout(() => {console.log("2. 네트워크 요청 완료");}, 3000);
console.log("3. 다른 작업 수행 중");
// 1. 네트워크 요청 시작
// 3. 다른 작업 수행 중
// 2. 네트워크 요청 완료
```

## 콜백 함수의 단점
### Callback Arrow
콜백 함수의 코드 형태가 중첩되며 들여쓰기가 깊어지고, 코드의 가독성이 떨어지는 형태이다.
콜백 함수마다 에러처리를 따로 해줘야하는 번거로움과, 코드의 흐름을 파악하기에도 부적절하다.
**EX**
```js
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);
    if (callback) {
      callback(increased); // 콜백함수 호출
    }
  }, 1000);
}

increaseAndPrint(0, n => {
  increaseAndPrint(n, n => {
    increaseAndPrint(n, n => {
      increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
          console.log('끝!');
        });
      });
    });
  });
});
```

이런 구조를 개선하기 위해 Promise객체로 리팩토링하여 깔끔하게 정리가 가능하다.
```js
function increaseAndPrint(n) {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      const increased = n + 1;
      console.log(increased);
      resolve(increased);
    }, 1000)
  })
}

increaseAndPrint(0)
  .then((n) => increaseAndPrint(n))
  .then((n) => increaseAndPrint(n))
  .then((n) => increaseAndPrint(n))
  .then((n) => increaseAndPrint(n));
```

## Promise객체 사용법
대부분은 Promise를 사용할 때 이미 만들어진 Promise객체를 사용하게 된다.
많은 라이브러리들이 사용할 때 Promise객체를 반환하고 우리는 그것만 사용하면 된다.
기본적으로 Promise는 함수에 콜백을 전달하는 대신에, 콜백을 첨부하는 방식의 객체이다.

비동기적으로 음성파일을 생성해주는 `createAudioFileAsync()`라는 함수를 만들어보자.
- 음성 설정에 대한 정보를 받는다.
- 두 가지 콜백함수를 받는다.
  - 음성파일이 성공적으로 생성되었을 때, 에러가 발생했을 때 실행되는 콜백

```js
function successCallback(result) {
  console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
  console.log("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```
아주 기본적인 콜백 구성으로 만들어진 함수이다.
좀 더 모던한 함수들은 위와 같이 콜백을 전달하지 않으며, 콜백을 붙여 사용할 수 있게 Promise를 반환해준다.
```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```
```js
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback)
```

### Promise를 사용할 때 특징
Promise의 가장 뛰어난 장점 중 하나는 Chaining이다.

- 콜백은 JavaScript Event Loop가 **현재 실행중인 콜 스택을 완료**하기 이전에는 절대 호출되지 않는다.
- 비동기 작업이 성공하거나 실패한 뒤에 `then()`을 이용하여 추가한 콜백의 경우에도 위와 같다.
- `then()`을 여러번 사용하여 여러개의 콜백을 추가할 수 있다. 그리고 각각의 콜백은 주어진 순서대로 하나 하나 실행된다.
이렇게 then()을 여러번 사용하여 순서를 지정해 주는 것을 Promise Chaining이라고 한다.

### Chaining
보통 두개 이상의 비동기 작업을 순차적으로 실행해야 하는 상황들이 많다.
**EX**
API로 데이터를 요청하고 성공시 > SetTimeout을 달아서 > 특정 DOM에 eventHandler를 추가하고 > 동영상을 재생시키기
이전 단계의 비동기 작업이 성공하고 나서 그 결과값을 이용하여 다음 비동기 작업을 실행해야 하는 경우 Promise Chain을 이용하여 해결하도록 한다.

**`then()`함수는 새로운 promise를 반환한다.**
```js
const promise1 = doSomething();
const promise2 = promise1.then(successCallback, failureCallback);
```
이늰 아래와도 같이 표현 가능하다.
```js
const promise2 = doSomething().then(successCallback, failureCallback);
```
두 번째 promise는 `doSomething()`뿐만 아니라 `successCallback` or `failureCallback`의 완료를 의미한다.
`successCallback`과 `failureCallback`또한 promise를 반환하는 비동기 함수일 수도 있다.
이 경우 `promise`에 추가된 콜백은 `successCallback`또는 `falureCallback`에 의해 반환된 promise 뒤에 대기한다.

이로인해 상기한 `콜백지옥`에서 벗어날 수 있다.
조금 더 실무에서 사용하는 코드처럼 작성하면 아래와 같다.
```js
doSomethingAsync()
  .then((result) => doSomethingNext(result))
  .then((value) => doSecondThing(value))
  .then((data) => doLastThing(data))
  .then((result) => console.log(`this is final result: ${result}`))
  .catch(failureCallback);
```
이런식으로 `then()`의 두번째 인자(`failure Callback function`)를 생략하여 한번에 `catch`로 처리하는 코드도 있다.
이해를 돕기위해 좀더 풀어서 설명해보자.

```js
doSomethingAsync()
  .then(
    (result) => doSomethingNext(result),
    (error) => console.error("doSomethingAsync 에러:", error)
  )
  .then(
    (value) => doSecondThing(value),
    (error) => console.error("doSomethingNext 에러:", error)
  )
  .then(
    (data) => doLastThing(data),
    (error) => console.error("doSecondThing 에러:", error)
  )
  .then(
    (result) => console.log(`this is final result: ${result}`),
    (error) => console.error("doLastThing 에러:", error)
  );
```
이런식의 코드진행이 `catch`를 통해서 더욱 간결하게 표현된다.
`catch`를 보면 자동적으로 `try-catch`구조가 떠오르지만 사용할 필요 없다.

## Promise객체를 생성하는 법
Promise객체를 생성하려면 `new`키워드와 함께 Promise 생성자 함수를 사용하면 된다.
```js
const myPromise = new Promise((resolve, reject) => {
// 비동기 작업 수행
    const data = fetch('서버로부터 요청할 URL');
    if(data)
    	resolve(data); // 만일 요청이 성공하여 데이터가 있다면
    else
    	reject("Error"); // 만일 요청이 실패하여 데이터가 없다면
})
```
기본적인 `Promise`객체 생성 예제이다.
`Promise`생성자 안에는 두개의 매개변수를 가진 콜백 함수를 넣게 된다.
첫번째 인수(`resolve`)는 작업이 성공했을 때 성공을 알려주는 객체이며, 두번째 인수(`reject`)는 작업이 실패했을 때 실패를 알려주는 객체이다.

`Promise`의 특징으로, `new Promise(...)`하는 순간 할당된 비동기 작업이 바로 진행된다.
함수는 기본적으로 정의되는 시점과 호출되는 시점이 다르지만, `new Promise`는 선언(정의)되는 순간 바로 호출을 한다.

새로운 `Promise` 객체를 만들어보자.
```js
const promise1 = new Promise((resolve, reject) => {
  resolve();
})

promise1
  .then(() => {
    console.log("succeed :) ")
  })
  .catch(() => {
    console.log("failed :( ")
  })
// succeed :)
```
`Prosmie`안에 `resolve()`만 실행이 되도록 선언했다. 이 `promise1`은 성공으로 간주될 `Promise`이며 `then()`에 있는 동작만 실행될 것이다.
또한 `Promise`객체는 할당과 동시에 실행된다. 따로 `promise1()` 이나 `console.log(promise1)` 등을 하지 않아도 자동으로 `succeed`가 output으로 출력된다.

만약 `Promise`안에서 두번째 인수인 `reject`를 실행시킨다면?

```js
const promise2 = new Promise((resolve, reject) => {
  reject();
})

promise2
  .then(() => {
    console.log("succeed :) ")
  })
  .catch(() => {
    console.log("failed :( ")
  })
// failed :(
```
예상대로 `catch`만 실행되어 'failed :(' 가 출력되는 모습이다.

**이 예제는 비동기 작업이 아니기에 Promise를 쓸 필요는 없습니다. 단순 예제입니다.**

## Promise객체의 재사용
`new Promise(...)`를 하는 순간 Promise안의 콜백함수들이 실행된다고 서술했다.
그러면 비슷한 비동기 작업을 할 때마다 `Promsie`를 새로운 객체로 만들어 줘야하나? `new Promise(..,)`로?

그렇지 않다. `new Promise(...)`한 것을 그대로 `return`하는 함수를 만들어 사용하면 된다.

```js
function isAdult(age) {
  return new Promise((resolve, reject) => {
    if(age >= 20) resolve();
    else reject();
  });
}
// age를 받아 20살 이상이면 resolve, 아니라면 resolve를 실행시킨다.

const promsie1 = isAdult(24);
promise1
  .then(() => console.log("I AM ADULT"))
  .catch(() => console.log("I AM CHILD"))
  // I AM ADULT

isAdult(18)
  .then(() => console.log("I AM ADULT"))
  .catch(() => console.log("I AM CHILD"))
  // I AM CHILD
// 이렇게 객체를 생성하지 않고 바로 함수에서 then, catch를 사용하여 가독성을 높일 수 있다.
```

## Data를 전달하기
`resolve`, `reject` 함수에 인자를 전달함으로서 **`then` 및 `catch`함수에서 비동기 작업으로 부터 정보를 얻을 수 있다.**
```js
function isAdult(age) {
  return new Promise((resolve, reject) => {
    if(age >= 20) resolve(`${age}살은 성인 입니다.`);
    else reject(`${age}살은 미성년자 입니다.`);
  });
}

const promise1 = isAudlt(19);
promise1
```
