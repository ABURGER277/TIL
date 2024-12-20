# SOLID 원칙
>> 이 문서 코드블럭의 코드는 자바스크립트로 작성되었습니다.

**객체 지향 설계의 5대 원칙**

기본적으로 SOLID원칙을 알고서 디자인 패턴을 시작해야 한다.
SOLID에 위반하는 코드는 좋지 않다.

~~*개인적으로 자바스크립트의 클래스 문법을 좋아하진 않지만...*~~
*객체지향 원칙이기에 클래스문법으로 사용해서 확실히 이해하도록 해보자.*

## Single Responsibility Principle(단일 책임 원칙)
**하나의 클래스는 하나의 책임만을 가져야 한다.**
잘못된 예시부터 봐보도록 하자.
```js
class User {
  // constructor 는 클래스의 인스턴스 객체를 생성하고 초기화하는 내장 메서드이다.
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  saveToDatabase() {
    // 데이터베이스에 저장하는 로직 ...
    console.log(`${this.name} saved to database`)
  }
  sendEmail() {
    // 이메일 전송 로직 ...
    console.log(`Email sent to ${this.email}`)
  }
}
```
`User`클래스는 지금 두가지의 책임을 하고 있다.
1. `saveToDatabase`:
   - 사용자 데이터를 저장하는 책임
2. `sendEmail`:
   - 이메일을 전송하는 책임.

이 두 책임은 서로 다른 성격을 가지며, **서로 독립적**이어야 한다.
독립적이지 않을 때 생길수 있는 문제들을 알아보자.
1. 함수 변경시 영향을 받음
   - 만약 `sendEmail`이 변경된다면 `saveToDatabase`로직이 바뀔 수 있다.
     - 이메일 전송하는 API가 변경되서 로직이 바뀐다면 DB에 저장하는 코드도 이상이 생길 수 있어 전체적인 테스트를 다시 해야한다.
2. 재사용성 문제
   - 데이터베이스 저장 로직 없이 사용자 객체만 필요하다거나, 이메일 전송 기능만 필요할 경우에도 전체 User 클래스를 사용해야 함.
   - 책임이 혼재되어 있어서 재사용성이 낮아짐.
3. 테스트가 어려움
   - 독립적인 테스트가 어려움
   - `sendEmail`이 `saveToDatabase`에 영향을 줄 수 있기 때문

**좋은 예:**
```js
class User {
  // constructor 는 클래스의 인스턴스 객체를 생성하고 초기화하는 내장 메서드이다.
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

class UserRepository {
  save(user) {
    // 데이터베이스에 저장하는 로직 ...
    console.log(`${user.name} saved to database`)
  }
}

class EmailService {
  sendEmail(user) {
    // 이메일 전송 로직 ...
    console.log(`Email sent to ${user.email}`)
  }
}

//// 사용 예제 ///
const user = new User("John", "john2200@gmail.com");

const userRepository = new UserRepository();
userRepository.save(user);

const emailService = new EmailService();
emailService.sendEmail(user);
```

---
## Open/Closed Principle(개방-폐쇄 원칙)
**코드는 확장에 열려있어야 하며, 수정에는 닫혀 있어야 한다.**
즉, 새로운 기능을 추가할 수는 있어야 하지만, 기존 코드를 수정하지 않고 이를 가능하게 해야 한다는 것이다.

### 왜 중요한가?
1. **변경으로 인한 오류방지:**
   - 기존 코드를 변경하면 다른 곳에서 새로운 버그가 발생할 위험이 있다.(`Syntax Error`에 잡히지 않을수도..!)
   - 따라서 기존 코드를 변경하지 않고 새로운 기능을 추가할 수 있으면 좋다.

2. **확장성:**
   - 프로젝트가 커질수록 새로운 요구사항이 생긴다.
   - 기존 코드를 수정하지 않고 기능을 추가할 수 있다면 코드 관리가 더 쉬워진다.

나쁜 예시부터 봐보도록 하자.
```js
// 나쁜 예시
class Discount {
  calculate(price, type) {
    if (type === "student") return price * 0.9;
    if (type === "senior") return price * 0.8;
    return price;
  }
}
//// 사용 예시 ////
const discount = new Discount();
const studentDiscountResult = discount.calculate(10000, "student");
const seniorDiscountResult = discount.calculate(8000, "senior");
```

좋은 예시도 봐보자.
```js
// 좋은예시
// Discount 인터페이스를 생성
class Discount {
  calculate(price) {
    return price
  }
}

// 학생 할인 클래스
class StudentDiscount extends Discount {
  calculate(price) {
    return price * 0.9;
  }
}

// 노인 할인 클래스
class SeniorDiscount extends Discount {
  calculate(price) {
    return price * 0.8;
  }
}

// 할인 적용 함수
function applyDiscount(discount, price) {
  return discount.calculate(price);
}

//// 사용 예시 ////
const studentDiscount = new StudentDiscount();
const seniorDiscount = new SeniorDiscount();

console.log(applyDiscount(studentDiscount, 10000)); // 9000
console.log(applyDiscount(seniorDiscount, 1000)); // 800
```
성인과 학생에 따른 할인가를 출력해주는 함수이다.
딱 봤을 때 난 나쁜 예시가 더 좋아보이는데... 학생과 노인일 때 할인가를 지정해 줄 수 있는 기능 확실히 있다.
가독성도 매우 좋아보인다.
오히려 좋은 예시가 과잉 설계(`OverEngineering`)처럼 느껴진다.
기능이 추가될때마다 `if case`가 많아진다는데 그게 뭐 어때. 추가 해주면 그만 아닌가?
```js
class Discount {
  calculate(price, type) {
    if (type === "student") return price * 0.8;
    if (type === "senior") return price * 0.9;
    if (type === "child") return price * 0.7;
    if (type === "special") return price * 0.5;
    // ...
    return price;
  }
}
```

**그러나 더욱 복잡한 비즈니스 로직이 요구된다면?**
**만약 새로운 할인 정책이 요구된다면?**
- `특별 행사 할인(기간 설정 요구)`
  - 그 할인을 겹칠 수 있게 짜달라한다면? (학생할인 + 겨울할인)
특별 할인 행사를 나쁜 예시로 짜보자.
```js
class Discount {
  calculate(price, type) {
    if (type === "student") return price * 0.9;
    if (type === "senior") return price * 0.8;
    if (type === "child") return price * 0.7;
    return price;
  }
}
// 겨울 특별 할인
class specialWinterDiscount {
  calculate(price, type) {
    if (type === "student") return price * 0.45;
    if (type === "senior") return price * 0.4;
    if (type === "child") return price * 0.35;
  }
}
// 카드사 특별 할인
class specialCardDiscount {
  // ...
}
// 브랜드 특별 할인
class specialBrandDiscount {

}
```
이런식으로 할인 종류마다 다 다시 선언을 해줘야 할것이다...
조건도 추가될 수 있을것이니 여기에서도 그런 고려를 해줘야 할 것이고...
그럼 `OCP`에 기반하여 인터페이스로 만든 좋은 예시로 다시 생각을 해보자.

```js
class Discount {
  calculate(price) {
    return price
  }
}
// 겨울 특별 할인
class WinterDiscount extends Discount {
  calculate(price) {
    // 50퍼센트 추가 할인
    return price * 0.5;
  }
}

// 카드사 특별 할인
class CardDiscount extends Discount {
  calculate(price) {
    return price * 0.7;
  }
}

// 학생 할인 클래스
class StudentDiscount extends Discount {
  calculate(price) {
    return price * 0.9;
  }
}

// 노인 할인 클래스
class SeniorDiscount extends Discount {
  calculate(price) {
    return price * 0.8;
  }
}

// 할인 적용 함수
function applyDiscount(discount, price) {
  return discount.calculate(price);
}

// 복합 할인 정책
class CombinedDiscount extends Discount {
  constructor(...discounts) {
    super();
    this.discounts = discounts;
  }

  calculate(price) {
    return this.discounts.reduce((currentPrice, discount) => {
      return discount.calculate(currentPrice);
    }, price);
  }
}

//// 사용 예시 - 학생 겨울할인 이벤트////
const price = 100;

// 학생 할인만 적용
const studentDiscount = new StudentDiscount();
console.log("학생 할인:", studentDiscount.calculate(price)); // 90

// 학생 할인 + 겨울 특별 할인 적용
const studentWithWinterDiscount = new CombinedDiscount(
  new StudentDiscount(),
  new WinterDiscount()
);
console.log(
  "학생 할인 + 겨울 특별 할인:",
  studentWithWinterDiscount.calculate(price)
); // 45 (0.9 * 0.5)
```
여기서 더 기능이 확장될수록 `OCP원칙`을 지키는 코드 구조가 더욱 중요해진다.

---
## Liskov Substitution Principle(리스코프 치환 원칙)
**자식 클래스는 부모 클래스의 기능을 대체할 수 있어야 한다.**
- 부모 클래스 대신 자식 클래스를 사용해도 코드가 문제없이 동작해야 한다.
- 자식 클래스가 부모 클래스의 동작을 **깨트리지 않아야 한다.**
- 객체 지향에서 상속을 사용할 때, **자식 클래스가 부모 클래스의 규약을 준수**해야 한다.

**나쁜 예**:
```js
class Bird {
  fly() {
    console.log("This bird can fly");
  }
}

class Sparrow extends Bird {}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly");
  }
}

// 사용하는 코드
function makeBirdFly(bird) {
  bird.fly();
}

const sparrow = new Sparrow();
makeBirdFly(sparrow); // "This bird can fly"

const penguin = new Penguin();
makeBirdFly(penguin); // Error: Penguins cannot fly
```
**펭귄**은 날지 못하니까 `fly()`함수에서 `Error`를 `throw()`하도록 설계 되었다.
근데 펭귄 클래스의 내부코드를 안읽고 `extends bird`만 확인해서는 `throw()`를 하는지 알 수가 없다.
오해의 소지가 많은 코드임...
`Bird`인터페이스 자체가 날 수 있다고 분류를 해둔 상태인데 펭귄이 못나는 것이 아니라, 펭귄은 새가 아닌게 맞다.

**좋은 예:**
```js
class Bird {
  move() {
    console.log("This bird can move");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log("This bird can fly");
  }
}

class Sparrow extends FlyingBird {}

class Penguin extends Bird {
  swim() {
    console.log("This bird can swim");
  }
}

// 사용하는 코드
const sparrow = new Sparrow();
sparrow.move(); // "This bird can move"
sparrow.fly();  // "This bird can fly"

const penguin = new Penguin();
penguin.move(); // "This bird can move"
penguin.swim(); // "This bird can swim"
```
이렇게 코드를 짜면 **일관적인 기능**을 제공한다.
부모 클래스(`Bird`)의 메서드(`move`)는 모든 자식클래스에서 문제없이 동작한다.
또한 호출 코드는 특정 자식 클래스의 세부 구현을 몰라도 동작 가능하다.

**리스코프 치환 원칙**은 **부모를 대체할 수 있는 자식**을 설계하는 것에 집중하도록 한다.
**상속받은 자식클래스가 부모의 기능을 깨트리지 않도록 한다.(치환이 가능하도록 한다.)**

---
## Interface Segregation Principle(인터페이스 분리 원칙)
**클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.**
- 인터페이스(또는 클래스)가 너무 많은 책임을 가지지 않도록 설계해야 한다.
  - 클라이언트에서 필요하지 않은 메서드까지 구현해야 될 수도 있다.
- 각 클라이언트가 필요한 메서드만 포함된 인터페이스를 제공하도록 설계해야 한다.

**나쁜 예:**
```js
class Animal {
  eat() {
    console.log("Eating...");
  }

  fly() {
    console.log("Flying...");
  }

  swim() {
    console.log("Swimming...");
  }
}

class Dog extends Animal {
  fly() {
    throw new Error("Dogs cannot fly!");
  }

  swim() {
    console.log("Dog is swimming...");
  }
}

class Bird extends Animal {}

const dog = new Dog();
dog.eat();  // "Eating..."
dog.swim(); // "Dog is swimming..."
dog.fly();  // Error: Dogs cannot fly!
```

`Dog`클래스는 `fly()`메서드를 사용하지 않지만, 부모클래스(`Animal`)에서 상속받았기에 강제적으로 구현해야 한다.
"**강아지는 날 수 없다.**"라는 사실이 코드로 반영되지 않고, 오히려 예외를 던지게 된다.
또한 `Animal`클래스가 모든 동물들의 행위(`eat`, `fly`, `swim`)을 정의하고 있기 때문에, 특정 행동을 하지 않는 동물도 필요 없는 메서드를 가지게 된다.

**좋은 예:**
```js
// 각 행동을 별도의 인터페이스로 분리
class Eater {
  eat() {
    console.log("Eating...");
  }
}

class Flyer {
  fly() {
    console.log("Flying...");
  }
}

class Swimmer {
  swim() {
    console.log("Swimming...");
  }
}

// 각 동물은 필요한 행동만 구현
class Dog extends Eater {
  swim() {
    console.log("Dog is swimming...");
  }
}

class Bird extends Eater {
  fly() {
    console.log("Bird is flying...");
  }
}

const dog = new Dog();
dog.eat();  // "Eating..."
dog.swim(); // "Dog is swimming..."
// dog.fly(); // Error: fly is not a function

const bird = new Bird();
bird.eat(); // "Eating..."
bird.fly(); // "Bird is flying..."
```
**다양한 클라이언트가 같은 인터페이스를 사용할 때**, **코드의 유지보수성을 높이고 싶을 때** 반드시 사용하도록 한다.
큰 인터페이스를 작은 인터페이스로 나누고, **인터페이스 수준에서의 책임 분리**에 초점을 맞춘다.

---
## Dependency Inversion Principle(의존성 역전 원칙)
**고수준 모듈은 저수준 모듈에 의존해서는 안 되고, 둘다 추상화에 의존해야 한다.**
~~좀 어려운 말인데?~~
- **고수준 모듈:**
  - 애플리케이션의 주요 로직을 담당하는 부분(서비스, 비즈니스 로직)
- **저수준 모듈:**
  - 구체적인 구현을 담당하는 부분(데이터베이스, API, 파일 시스템)
- **상위 계층(고수준 모듈)이 하위 계층(저수준 모듈)의 세부사항에 의존하지 않도록 설계해야 한다.**
- **추상화(인터페이스)**를 통해 고수준과 저수준 모듈 간의 의존성을 느슨하게 만들도록 한다.

**나쁜 예:**
```js
// 저수준 모듈 - DB연결
class MySQLDatabase {
  connect() {
    console.log("Connected to MySQL database");
  }

  save(data) {
    console.log(`Saving ${data} to MySQL database`);
  }
}

// 고수준 모듈 - 비즈니스 로직, 서비스
class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // 직접적으로 MySQLDatabase에 의존
  }

  saveUser(user) {
    this.db.connect();
    this.db.save(user);
  }
}

// 사용하는 코드
const userService = new UserService();
userService.saveUser("John");
// "Connected to MySQL database"
// "Saving John to MySQL database"
```
1. **고수준 모듈(`UserService`)이 저수준 모듈(`MySQLDatabase`)에 의존**
- UserService는 MySQLDatabase라는 특정 데이터베이스 구현에 강하게 결합되어 있다.
- 다른 데이터베이스(예: MongoDB)를 사용하고 싶다면 UserService 코드를 수정해야 함.

2. **확장성과 유연성 부족**
- 새로운 데이터베이스를 추가하려면 `UserService` 내부 로직을 수정해야 함.
- 코드를 수정하다 보면 기존 로직이 망가질 가능성이 높아짐.

올바르게 설계해보자.
```js
// 추상화된 인터페이스
class Database {
  connect() {
    throw new Error("connect 메서드가 구현되지 않았습니다.");
  }

  save(data) {
    throw new Error("save 메서드가 구현되지 않았습니다.");
  }
}

// 구체적인 구현체 1: MySQL
class MySQLDatabase extends Database {
  connect() {
    console.log("Connected to MySQL database");
  }

  save(data) {
    console.log(`Saving ${data} to MySQL database`);
  }
}

// 구체적인 구현체 2: MongoDB
class MongoDB extends Database {
  connect() {
    console.log("Connected to MongoDB");
  }

  save(data) {
    console.log(`Saving ${data} to MongoDB`);
  }
}

// 고수준 모듈: UserService
class UserService {
  constructor(database) {
    this.db = database; // 추상화된 Database 인터페이스에 의존
  }

  saveUser(user) {
    this.db.connect();
    this.db.save(user);
  }
}

// 사용하는 코드
const mySQLDatabase = new MySQLDatabase();
const mongoDatabase = new MongoDB();

const userService1 = new UserService(mySQLDatabase);
userService1.saveUser("John");
// "Connected to MySQL database"
// "Saving John to MySQL database"

const userService2 = new UserService(mongoDatabase);
userService2.saveUser("Jane");
// "Connected to MongoDB"
// "Saving Jane to MongoDB"
```
1. **의존성 분리***
- UserService는 MySQLDatabase나 MongoDB와 같은 구체적인 구현체에 의존하지 않음.
- 대신 Database라는 추상화된 인터페이스에 의존하므로, 새로운 데이터베이스를 추가해도 UserService를 수정할 필요가 없음.

2. **확장성**
- 새로운 데이터베이스를 추가하려면, Database를 구현하는 새로운 클래스를 만들기만 하면 됨.

3. **유지보수성 향상**
- 데이터베이스 구현 변경이 고수준 모듈(UserService)에 영향을 주지 않음.

4. **테스트 용이성**
- 데이터베이스를 실제로 연결하지 않고, 테스트 목(mock)을 만들어 UserService를 테스트할 수 있음.

### Dependency Inversion Principle 요약
- 고수준 모듈과 저수준 모듈이 추상화(인터페이스)에 의존해야 한다.
- 저수준 모듈에 직접 의존하지 않도록 설계해야 한다.
- 이를 통해 코드의 유연성과 확장성을 높이고, 유지보수를 더 쉽게 할 수 있다.
