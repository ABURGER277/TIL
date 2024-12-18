# Observer Pattern
## 옵저버 패턴의 정의
**옵저버 패턴(`Observer Pattern`)**은 옵저버(`관찰자`)들이 관찰하고 있는 대상자의 상태가 변화가 있을 때 마다 대상자는 직접 목록의 각 관찰자들에게 통지하고, 관찰자들은 알림을 받아 조치를 취하는 행동 패턴이다.

## 옵저버 패턴의 예시
- **DOM 이벤트 모델(`Event Target`)**
  - 브라우저의 DOM 이벤트 리스너(`addEventListener`) 메커니즘은 주체(이벤트를 발생하는 DOM 노드)와 옵저버(해당 이벤트를 듣는 콜백 함수) 관계로 구현되어있다.

- **MutationObserver**
  - DOM 요소의 변경을 감지하고 콜백을 실행하는 API 다. 특정 노드 변화를 "관찰(Observe)"하고 상태 변화가 있을 때 등록된 콜백을 통해 알림을 받는다.

- **IntersectionObserver**
  - 특정 요소가 viewport나 지정한 부모 컨테이너와 교차하는지 관찰하고, 교차 상태 변화를 알림으로써 lazy loading, 무한 스크롤 등의 기능을 구현할 때 활용된다.

- **RxJS Observables**
  - RxJS에서 제공하는 `Observable`은 옵저버 패턴을 기초로 하며, 데이터 스트림을 발행하고 구독자(observer)가 해당 스트림을 구독하며 변화에 따라 반응한다.

- **Vue.js의 `watch` 옵션**
  - Vue 컴포넌트 내에서 특정 상태(데이터 혹은 computed 값)의 변화를 감지하고 반응하는 로직을 작성할 때 사용한다.
  - 이는 내부적으로 상태가 바뀌면 해당 변화를 감지하는 옵저버가 반응하는 형태이므로 옵저버 패턴의 응용이라고 볼 수 있다.

- **Node.js의 EventEmitter**
  - Node.js의 `EventEmitter` 클래스는 옵저버 패턴을 구현한 대표적인 예다.
  - 특정 이벤트명에 대해 구독(`.on()`)한 리스너들이, 해당 이벤트가 `emit()`으로 발생되면 일제히 반응한다.

## 옵저버 패턴의 흐름
옵저버 패턴은 여타 다른 디자인들과 다르게 **일대다(`one to many`) 의존성**을 가진다.
이는 주로 분산 이벤트 핸들링 시스템을 구현하는데 사용되며, **Pub/Sub(발행/구독)**의 모델로도 알려져 있다.

이 패턴을 이해하는데 있어 `뉴스 피드`나 `유튜브 구독`등에 비유하곤 한다.
유튜브 채널은 발행자(`Subject`)가 되고 구독자들은 관찰자(`Obserer`)가 되는 구조로 보면된다.

1. 유튜버가 영상을 올린다.
2. 구독자들은 영상이 올라왔다는 알림을 받는다.
3. 각 구독자들은 알림에 따라 영상을 보거나 안 볼 수 있다.
   - 구독을 해지하거나 하지 않았다면 알림이 오지 않는다.

> 프로그래밍적으로 옵저버 패턴은 사실 `'관찰'` 하기 보단 갱신을 위한 힌트 정보를 `'전달'` 받길 기다린다고 보는 것이 적절하다.
> 관찰자라는 단어 뉘앙스에서 능동적으로 대상을 관찰하는 것처럼 느껴지지만,
> 사실 대상 객체로부터 수동적으로 전달 받기를 기다리고 있기 때문이다.


## 간단한 옵저버 패턴의 구현
간단한 옵저버패턴을 자바스크립트로 구현 해보았다.
```js
// Subject 생성자 함수
function Subject() {
  this.observers = []; // 옵저버(콜백 함수)를 저장할 리스트
}

// Subject 프로토타입 객체
Subject.prototype = {
  subscribe: function(fn) {
    this.observers.push(fn); // subscribe 메서드를 통해 옵저버(콜백 함수)를 추가
  },
  unsubscribe: function(fn) {
    this.observers = this.observers.filter(observer => observer !== fn); // unsubscribe 메서드를 통해 옵저버(콜백 함수)를 제거
  },
  notify: function(data) {
    this.observers.forEach(observer => observer(data)); // notify 메서드를 통해 등록된 옵저버(콜백 함수)를 모두 실행
  }
};

// Subject 인스턴스 생성
const subject = new Subject();

function observerA(data) { console.log('옵저버 A 수신:', data) };
function observerB(data) { console.log('옵저버 B 수신:', data) };
function observerC(data) { console.log('옵저버 C 수신:', data) };
// ------------Subject 및 Observer 생성 완료------------
// 아직 옵저버들이 구독하지 않은 상태
subject.notify('최초 데이터 전달');
// 아무런 반응이 없다 - 정상 동작

// 그럼 옵저버들을 구독시켜보자. A, B만 구독시키고 테스트
subject.subscribe(observerA);
subject.subscribe(observerB);

subject.notify('두 옵저버에게만 데이터 전달');
// 옵저버 A 수신: 두 옵저버에게만 데이터 전달
// 옵저버 B 수신: 두 옵저버에게만 데이터 전달

// A옵저버를 구독 취소시켜볼까?
subject.unsubscribe(observerA);

subject.notify('A 옵저버 구독 취소 후 데이터 전달');
// 옵저버 B 수신: A 옵저버 구독 취소 후 데이터 전달
```

## 옵저버 패턴의 특징
### 패턴 사용 시기
- 앱이 한정된 시간, 특정한 케이스에만 다른 객체를 관찰해야 할 때
- 대상 객체의 상태가 변경될 때마다 다른 객체의 동작을 트리거해야 할 때
- 한 객체의 상태가 변경되면 다른 객체도 변경해야 할 때, 그런데 어떤 객체들이 변경되어야 하는지 몰라도 될 때
- `MVC(Model, View, Controlelr)`패턴에서도 사용딤
  - `MVC`의 `Model`과 `View`의 관계는 `Observer`패턴의 `Subject`역할과 `Observer`역할의 관계에 대응된다.
  - 하나의 `Model`에 복수의 `View`가 대응한다.

### 패턴 장점
- `Subject`의 상태 변경을 주기적으로 조회하지 않고 자동으로 감지할 수 있다.
- 발행자의 코드를 변경하지 않고도 새 구독자 클래스를 도입할 수 있어 **개방 폐쇄 원칙(`OCP`)**을 준수한다.
- 런타임 시점에서 발행자와 `구독 <=> 알림` 관계를 맺을 수 있다.
- 상태를 변경하는 객체(`Subject`)와 변경을 감지하는 객체(`Observer`)의 관계를 느슨하게 유지할 수 있다.

### 패턴 단점
- 구독자는 알림 순서를 제어할 수 없고, 무작위 순서로 알림을 받는다.
  - 하드코딩으로 구현할수는 있으나, **복잡성과 결합성이 높아지므로 추천하지 않음**
- 옵저버 패턴을 자주 구성하면 구조와 동작을 알아보기 힘들어져 코드 복잡도가 증가할 수 있다.
- 다수의 옵저버 객체를 등록 이후 해지(`unSubscribe`)하지 않는다면 메모리 누수가 발생할 수 있다.

---
### 한줄 요약
**옵저버 패턴을 통해 특정 객체의 상태 변화를 감지하여 반응 할 수 있는 트리거를 만들어보자!**