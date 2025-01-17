# 서버
이 문서는 원래 `서버`라는 단어가 여러 곳에서 혼용 되어 사용되기에 이를 정리하고자 작성을 시작.
> *`Java`, `Javascript`로 서버를 만든다고 알고 있는데, 거기에 **WS**, **WAS**라는 개념은 또 왜 들어오는 것인가.*
> *클라이언트-서버, 웹서버, 웹애플리케이션서버, 자바서버, 노드서버, api서버 등등...*

## 서버란
**Web Server(WS), Web Application Server(WAS)**에서 공통적으로 사용되는 `Server`란 무엇인가

**서버**는 클라이언트(브라우저)에서 요청을 받아 처리하고 응답을 돌려주는 역할을 하는 **전체 시스템**이다.(Client-Server)

서버는 크게 두가지 요소로 나뉜다:
1. **물리적 서버**, **가상 서버**:
   - 실제로 동작하는 컴퓨터나 가상 환경(VM, 클라우드 서버)자체를 말한다.
   - AWS EC2, 로컬에서 실행하는 컴퓨터
2. **소프트웨어 서버**:
   - 서버에서 실행되는 프로그램으로, 클라이언트의 요청을 처리한다.
   - Apache, Nginx, Tomcat, Node.js 애플리케이션

## Web
**Web Server(WS), Web Application Server(WAS)**에서 공통적으로 사용되는 `Web`이란 무엇인가

`Web`은 인터넷을 기반으로 한 기술과 서비스를 포괄적으로 나타내는 용어다.
주로 **브라우저**라는 GUI를 통해 접근 가능하며,
주로 **HTTP**라는 규칙에 따라 나와 인터넷이 메시지를 주고받는다.



## WS(Web Server)
**Web Server**: **웹 서버는 클라이언트(브라우저)의 요청에 따라 `정적 웹 페이지`(HTML, CSS, JavaScript, 이미지)를 제공**하는 역할을 한다.
이때 사용자는 브라우저에 **URL을 변경**하는 것 말고는 인터넷에 다른 요청이 불가능 하다.
`WS`가 주류이던 시절에 웹 사이트의 용도는 `Read-Only`라고 생각하면 편하다.
*정보 제공용의 사이트가 대부분이였으며 `학술지` 정도로 시작되었던 웹이 사용자가 늘어남에 따라 `뉴스기사, 간단한 회사소개 페이지 등으로 발전`했다.*

`WS`의 대표적인 예로는:
- **Apache HTTP Server**
- **Nginx** (요즘 많이 사용)
가 있다.

정적웹의 예제는 다음과 같다:
- 블로그(댓글 등의 기능은 서버가 없으니 외부 API활용)
- 회사 소개 사이트
- 사이트는 아니더라도 랜딩 페이지(넷플릭스 진입 페이지)도 정적이다.(정적 웹 페이지)

다음은 정적 웹 사이트를 배포하는 시나리오다.

1. HTML파일을 준비하고(index.html)
2. 인터넷 도메인을 구하고(example.com)
3. DNS를 설정하고(도메인 이름을 서버의 IP주소와 연결)
4. 호스팅 방식을 선택하고(**호스팅: 웹사이트나 애플리케이션을 인터넷에서 접근 가능하게 만드는 것**)
   - 물리적 서버 구성
     - 직접 서버를 구성하고 운영할 수 있다..
     - 소프트웨어 서버로 Apache, Nginx와 같은 **`WS`**를 설치
   - 클라우드 서비스 사용(AWS, Google Cloud, Netilfy, Vercel)
     - 정적 웹 사이트는 Netlify, Vercel로 배포하는게 좋다.
5. 호스팅 서비스에 HTML을 업로드하고
   - 물리적 서버:
     - `FTP(FileZilla)`, `SSH` 등을 사용해 파일 업로드
     - `Apache`나 `Nginx` 설정 파일 수정 후 웹 서버 재시작
   - 클라우드 서비스:
     - `Netlify`, `Vercel`과 같은 플랫폼에서 파일 업로드 or Git연동
6. 서버에 배포한다.

**즉 이 과정에 있어서 Java혹은 Node를 이용해서 서버를 만들 필요가 없다.**
<u>오히려 자바와 같은 동적 서버언어를 사용한다는 것이 부적절.</u>
`Linux`에서 `Apache`, `Nginx`설치를 통해 서버를 구현하고 html을 업로드하면 되며 이렇게 만들어진 서버를 **웹 서버**라고 한다.
서버 구현 및 html업로드 과정이 복잡하다면 Vercel, Netlify 등 정적 웹사이트 클라우드 서비스를 이용하면 된다.
`Vercel`, `Netilfy`는 플랫폼 백엔드에서 사용자의 **웹 서버를 생성해주고 관리**해준다.(**PaaS**`Platform as a Service`)

## WAS(Web Application Server)
### `WAS`의 역할은 무엇인가.
- **WAS**는 동적인 작업(데이터 처리, 외부 API호출)등을 처리하는 소프트웨어 서버를 말한다.
- **WAS**는 클라이언트(브라우저)의 요청을 받아서 필요한 작업을 처리하고 결과를 반환한다.
  - 예: 회원가입 요청 → 데이터베이스에 저장 → 성공/실패 응답 반환

### `WAS`의 등장 배경
정적웹은 분명 한계가 있다. 정보를 제공만 해줄 뿐 사용자가 무언가 주체적으로 할 수 있는 것이 없다.
사용자가 참여할 수 있는 웹 사이트가 더욱 인기가 많은것은 부인할 수 없다.

1. 사이트에서 사용자가 사용할 수 있는 간단한 기능 제공(댓글, 좋아요, 평점 메기기)
2. 아예 사용자가 컨텐츠를 제작(SNS, 커뮤니티 등)
3. 이를 위한 사용자 인증처리(회원가입, 로그인, 세션관리, 맞춤형 데이터 제공)
4. 이 모든 기능들을 통해 들어온 데이터를 저장할 DB와의 연결

서술한 기능들을 **서버로직, 비즈니스 로직, 서비스로직**이라 부르며 `WAS`는 **이 로직(코드)을 실행하고 그 결과를 클라이언트에게 제공**한다.
***서버로직, 비즈니스 로직, 서비스 로직**은 각각 사용 의미가 다르지만 서술한 기능들이 제 역할을 하기 위해서 모두 필요하다.*
```markdown
간단히 짚고 넘어가자면
**서버 로직(Server Logic)**
- 서버에서 작동하는 모든 기술적 로직을 의미.
- 예: 요청/응답 처리, 라우팅, 세션 관리, 인증 등.
**비즈니스 로직(Business Logic)**
- 애플리케이션이 제공하는 실제 업무/기능 처리 로직.
- 예: 주문 처리, 결제 계산, 사용자 권한 관리.
**서비스 로직(Service Logic)**
- 비즈니스 로직과 다른 시스템 간의 연결을 처리하는 로직.
- 예: 외부 API 호출, 데이터베이스 연결 및 연산.
```

우리는 이 `WAS`환경 위에서 돌아갈 서비스 구현을 위해서 `Java(Spring)`과 `JavaScript(Node.js)`를 공부한다.
그리고 우리는 이러한 서비스를 구현하는 사람을 백엔드 개발자라고 부른다.

요약하자면
`WAS`는 이미 구현된 **서버역할을 하는 소프트웨어**이자 백엔드 개발을 할 수 있는 **환경**이다.
그리고 백엔드 개발은 이 `WAS`를 **사용**하는 개발자인것이다.

그럼 우리가 백엔드 개발을 할 때 `WAS`환경은 어디서 **제공**되는가?
이는 다음과 같다:
- Tomcat
- SpringBoot
- Node.js
- Express

### WAS의 역할을 수행하는 도구 설명
#### 1. Tomcat
**Tomcat**은 **WAS**로서 동작하는 소프트웨어다. 즉 **Tomcat**은 **WAS**다.
`Tomcat`은 주로 `Java`기반 애플리케이션을 실행시키는데 사용되며,
이는 `JSP(Java Servlet Page)`나 서블릿(`Servlet`)같은 기술을 실행하고, `HTTP`요청/응답을 처리한다.
**`Tomcat`은 자체적으로 실행가능한 `WAS`**이며 `Java`애플리케이션을 배포할 수 있다.
todo: 그럼 자바와 톰캣이 별도로 실행 가능한가?

#### 2. SpringBoot
**Spring Boot**는 `Java`프레임워크이다.
`Java`프레임워크인 `Spring Boot`는 **Tomcat을 내장하고 있다.**
개발자가 직접 `Tomcat`을 설치하고 설정해주지 않아도 `Spring Boot`프레임워크 위에서 코드를 작성하면 `Tomcat`위에서 동작한다.
자바 개발자가 **비즈니스 로직 구현에만 집중** 할 수 있도록 **WAS(Tomcat)설정을 단순화 한 프레임워크**이다.

#### 3. Node.js
**Node.js**의 정의는 다음과 같다: **Javascript기반 런타임 환경**
**런타임 환경이 무엇인가?**
따로 공부해야할 필요가 있다. 단순히 예제로만 들자면:
- Java: **JRE**(JVM + Class Library + Class Loader)
- Pytohn: **Python Interpreter** + Standard Library + Garbage Collector
- C: **런타임환경을 제공하지 않는 컴파일 언어**. 운영체제(OS)에서 실행된다.
- C#: **CLR**(Common Language Runtime)
- JavaScript: **Google V8 engine(브라우저/클라이언트), Node.js(서버)**
*런타임 환경은 프로그램이 실행될 때 필요한 자원(메모리, 프로세스 관리 등)과 도구(API, 엔진 등)를 제공하여 코드가 운영 체제와 상호작용할 수 있게 해주는 시스템*

자 본론으로 돌아와서,
`Javascript`는 기본적으로 **브라우저의 인터랙션을 위해 만들어진 언어**이지만, 자바스크립트를 브라우저 밖에서도 사용할 수 있도록 해주는것이 Node.js이다.
Node.js는 서버에만 쓰이는게 아니며 우리가 **자바스크립트를 여러곳에서 쓸 수 있는 환경 그 자체를 제공**해준다.
- **서버:**
  - `Express.js`, `Nest.js`
- **데스크톱 애플리케이션**
  - `Electron`
    - `VSC`, `Discord`
- **CLI application**
  - `Webpack`, `ESLint`, `npm`
등등 `IoT`, `게임 개발` 하물며 `머신 러닝`에도 자바스크립트 언어를 사용할 수 있으며 이를 가능하게 해주는 강력한 기술이 **Node.js**이다.

서술했듯 `Node.js`는 **`Javascript`로 서버를 만들 수 있게 해주는 환경을 개발자에게 제공**해준다.
그리고 우리는 다음과 같은 코드로 간단한`Node.js` 서버구현이 가능하다.
```js
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```
코드를 이해해보자.
1. `require('http')`:
   - **`http`**는 Node.js의 내장 모듈로, HTTP 요청/응답을 처리할 수 있는 도구를 제공한다.
   - **`require`**는 Node.js에서 모듈을 불러오는 함수로, http 모듈을 메모리에 로드한다.
   - 로드된 **http 객체**에는 **HTTP 서버와 클라이언트 관련 기능**을 담고 있다.
2. `http.createServer`:
   - **`createServer`**는 HTTP 서버를 생성하는 함수다.
   - **클라이언트의 요청(req)**과 **서버의 응답(res)**을 처리하는 콜백 함수를 인자로 갖는다.
3. `server.listen(3000)`:
   - 서버를 시작하고, 3000번 포트에서 클라이언트 요청을 기다린다.

**으음... 뭔가 자바랑 다르다.**
*스프링은 그냥 비즈니스 로직짜서 빌드해서 올리기만 하면 됐는데...*
그럴 수 밖에 없다.
자바는 톰캣(WAS)을 내장라이브러리에 넣으면 기본적인 `HTTP요청/응답`처리와 `WAS`환경까지 제공해준다.
- Java는 Tomcat 같은 WAS 위에서 돌아갈 코드를 작성한다.
- 개발자는 비즈니스 로직만 작성하고, WAS가 요청/응답 처리를 알아서 해준다.
- 빌드해서 코드(WAR/JAR)를 WAS에 올리기만 하면 끝.

그러나 `Node.js `는 `require`로 http모듈 가져오는것부터 시작해서 모든 환경 설정을 직접 해주고 있다.

서버를 만들 환경을 설정해준다... 어디서 들은 말 아닌가?
```markdown
요약하자면
`WAS`는 이미 구현된 **서버역할을 하는 소프트웨어**이자 백엔드 개발을 할 수 있는 **환경**이다.
그리고 백엔드 개발자는 이 `WAS`를 **사용**하는 개발자인것이다.
```

`Node.js`는 우리에게 `WAS`를 직접적으로 만들도록 한다.
`http`모듈을 로드하여 서버를 만들고, 라우팅, 세션 등 우리에게 필요한 모든 기능을 작성해주어야 한다.

즉, **Node.js는 그 자체로 `WS`이자 `WAS`로 사용할 수 있다.**
**Node.js는 자체적으로 HTTP 요청/응답 처리를 수행하며, 기본적으로 WAS 개념을 내장하고 있다.**

우리는 `Tomcat`과 같은 동작을 하는 애플리케이션을 `Node.js`를 통해 구현할 수 있다.

#### 4. Express
*와 근데 나는 백엔드 개발만 하고싶은데?* 바로 당신을 위해 `http`모듈을 제공해주며 이를 일괄적으로 관리할 수 있는 `Express`프레임 워크를 제공한다!
Node.js의 HTTP 모듈을 기반으로, 개발자가 비즈니스 로직에 집중할 수 있도록 도와준다.
- 라우팅, 미들웨어 처리, 세션 관리 등 복잡한 작업을 간소화한다.
- Node.js 환경에서는 `Express`가 `Spring`처럼 동작한다고 볼 수 있다.
  - Spring은 정확히 `WAS(Tomcat)`위에서 동작하는 프레임워크이며
  - Express는 Node.js가 `WAS`와 같은 환경을 제공해준다.