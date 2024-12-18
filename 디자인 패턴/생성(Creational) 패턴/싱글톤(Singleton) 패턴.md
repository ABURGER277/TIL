# Singleton Pattern
> Chat Gpt에게 물어봐가며 공부한 내용입니다.
## 싱글톤 패턴의 정의
**싱글톤 패턴이란 `단 하나의 유일한 객체`를 만들기 위한 코드 패턴이다.**

쉽게 말하자면 인스턴스가 필요할 때 **메모리 절약**을 위해서 똑같은 인스턴스를 **새로 만들지 않고 기존의 인스턴스를 활용**하는 기법을 말한다.

우리가 `전역변수`라는것을 만드는 이유는, **똑같은 데이터**를 **메서드마다 지역 변수로 선언하여 사용**하면
똑같은 데이터를 계속해서 선언하는 행위가 **무의미하며** 메모리 낭비이기 때문에 전역에서 한번만 데이터를 선언하고 가져와 사용하면 효율적이기 때문이다.

이러한 개념을 클래스에 그대로 대입한 것이 `싱글톤 패턴`이라고 이해하면 될것 같다.
따라서 보통 `싱글톤 패턴`이 적용된 객체가 필요한 경우는 그 객체가 **리소스를 굉장히 많이 차지하는 역할**을 하는 무거운 클래스일 때 적합하다.

## 싱글톤 사용 전 후 비교
간단한 자바스크립트 코드로 **싱글톤 패턴 적용 전후**를 비교해보자.
```js
function createObject() {
  return { name: "Hello" };
}

const obj1 = createObject();
const obj2 = createObject();

console.log(obj1 === obj2); // false (서로 다른 객체)
```
위에서 두 객체 `obj1`과 `obj2`는 `createObject()`에서 만들어진 다른 인스턴스이다.
하지만 싱글톤 패턴으로 구현해서 같은 인스턴스로 만들어보자.

```js
function createSingleton() {
  // instance를 static 속성으로 저장
  if(!createSingleton.instance) {
    createSingleton.instance = { name: "Hello" }; // 처음 호출 시 객체 생성
  }
  return createSingleton.instance; // 항상 같은 객체 반환
}

// 사용예시
const obj1 = createSingleton();
const obj2 = createSingleton();

console.log(obj1, obj2);
// { name: 'Hello' } { name: 'Hello' }
console.log(obj1 === obj2);
// true
```

## 싱글톤 패턴으로 만들어진 객체
### Vue, React의 전역 상태관리 라이브러리
자바스크립트 프레임워크중 `Vue3`에서는 `Pinia Store`, `React`에서는 `Redux`라이브러리가 있다.
이 라이브러리도 싱글톤처럼 동작하며, 전역 상태를 관리하며 애플리케이션 전역에서 동일한 상태를 공유한다.

### Axios 인스턴스
`HTTP 요청 라이브러리`인 `Axios`에서 `axios.create()`로 생성한 인스턴스는 싱글톤처럼 동작하도록 설계할 수 있다. 이를 통해 동일한 설정을 모든 요청에 사용할 수 있다.

### Runtime Config(nuxt.config.js)
`Vue.js`의 `Nuxt`프레임워크 프로젝트를 만들면 동시에 생성되는 실행 컨텍스트 파일이다.
이 `runtimeConfig`는 런타임 설정을 전역적으로 관리하며 싱글톤처럼 동작한다.
```js
// nuxt.config.js
export default {
  runtimeConfig: {
    public: {
      apiBase: "https://api.example.com",
    },
  },
};
```

### Logger
애플리케이션에서 전역적으로 로그를 기록하기 위해 로거 객체를 싱글톤으로 설계할 수 있다.
간단한 `LogService`를 구현해보자.
```js
const Logger = (function () {
  let instance;

  function createInstance() {
    return {
      log: function (message) {
        console.log(`[LOG]: ${message}`);
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log("Singleton Logger"); // [LOG]: Singleton Logger
console.log(logger1 === logger2); // true
```
---
## 싱글톤 패턴, 싱글톤 객체의 특징과 차이
**싱글톤 패턴(Singleton Pattern)**과 **싱글톤 객체(Singleton Object)**는 서로 관련이 있지만 약간 다른 개념이다.
### 싱글톤 패턴
**의도적으로 설계된 소프트웨어 디자인 패턴이다.**
- 애플리케이션에서 특정 클래스나 객체의 인스턴스가 단 하나만 존재하도록 보장하는 구조
- 싱글톤 패턴은 “단일 인스턴스”라는 개념을 코드로 구현한 방식을 가리킨다.
- 객체를 생성하는 메커니즘을 제공 (getInstance 같은 메서드)
-	인스턴스가 이미 생성되었는지 확인하고, 필요하면 새로 생성한다.
- 이후에는 항상 동일한 인스턴스를 반환한다.

### 싱글톤 객체
**기본적으로 싱글톤 패턴을 구현한 결과물이다.**
- 즉, `하나만 존재하는 객체`를 의미한다.
- 애플리케이션 내에서 한번만 생성되며, 모든 곳에서 동일한 참조를 가르킨다.
- 그러나 이와 유사한 특징을 가진 객체가 있으니... 바로 **전역 객체**이다.
  - **`전역 객체`**는 싱글톤 패턴으로 생성되지 않았지만 싱글톤 패턴으로 만들어진 객체와 아주 비슷한 특징을 가진다.
  - 대표적으로 브라우저 환경에서 제공되는 `window 객체`는 명시적으로 싱글톤 패턴으로 구현된 것은 아니지만, 실행 환경에서 단일 인스턴스로 존재하므로 싱글톤과 유사한 특징을 지닌다.

### 싱글톤 객체와 전역 객체의 차이
**싱글톤 객체**
- 의도적으로 설계된 패턴으로, 애플리케이션에서 특정 클래스나 객체의 단 하나의 인스턴스만 존재하도록 보장한다.
- 단일 인스턴스에 접근하려면 보통 특정 메서드(getInstance)를 사용하며, 직접 인스턴스를 생성할 수 없도록 설계.
- 특정 역할을 수행하며, 주로 상태 관리나 리소스 공유를 위해 사용된다.

**전역 객체**
- 실행 환경에서 자동으로 제공되는 객체로, 모든 스코프에서 접근 가능하다.
- 전역 스코프의 모든 데이터를 관리하거나 실행 환경에서 제공하는 기능을 포함한다다.
- 브라우저에서는 window가, Node.js에서는 global이 전역 객체의 대표적인 예

---
### 한줄 요약
**싱글톤 객체와 전역 객체라는 단어의 쓰임에 유의하고**
**싱글톤 패턴을 통해 전역에서 사용할 수 있는 인터페이스를 만들어 애플리케이션에 적용시켜보자!**
