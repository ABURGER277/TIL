# CORS(Cross-Origin Resource Sharing)
한국어로 `교차 출처 리소스 공유` 정책.

:question:
>프로그래밍에서 `Cross`(교차)란 서로 다른 플랫폼에서 같은 내용을 `share`할 때 보통 사용된다.
>예로 React Native는 iOS와 Android용 네이티브 앱을 동시에 개발할 수 있는 **교차** 플랫폼 프레임워크다.

`CORS`를 알기 위해서는 기본적으로 짚고 넘어가야할 몇가지 배경지식이 필요하다.
1. `Origin`: 출처
2. `SOP(Same-Origin Policy)`: 동일 출처 정책
3. `HTTP`: 요청과 응답.

이 3가지를 먼저 짚어보자.

---
## Origin
`CORS`에서 `Origin`은 `URL`에서 출처를 판단한다.

예시 URL링크로부터 `Origin`의 개념을 파악해보자.
`https://developer.mozilla.org/ko/docs/Learn_web_development`

`Origin`은 다음 3가지로부터 판단된다.
1. `Protocol`
   - `http`, `https` 등
2. `Doamin`
   - `example.com`, `developer.mozilla.org` 등
   - `localhost`, `127.0.0.1`을 다르게 판단한다.
3. `Port`
  - `:80`(http 기본 포트), `:443`(https 기본 포트) 등
  - `:8080`(Tomcat의 기본 포트로 Spring Boot도 동일), `:3000`(Express, React, Vue 등 노드 기반 도구의 기본값) 등
  - `Port`가 `URL`에 명시되어 있지 않다면 프로토콜의 기본 포트를 따라간다.
    - `https://developer.mozilla.org/ko/docs/Learn_web_development` 여기서 `https` 프로토콜을 사용중이기에 포트는 자동적으로 **`443`**으로 적용된다.

즉 예시문에서 출처는 `https://developer.mozilla.org:443`이 되시겠다.

## SOP(Same-Origin Policy)
한국어로 **동일 출처 정책**이다.
브라우저에서는 **동일한 Origin**사이에서만 리소스를 공유할 수 있다.
즉 서술한 `Protocol`, `Domain`, `Port` **3가지가 동일한 곳**에서 온 요청에만 리소스를 공유한다는 것이다.
**3가지중 하나라도 다르다면 다른 출처로 간주한다.**
~~실제로 IE는 Origin 중 Port를 검증하지 않아서 보안적으로 굉장히 취약했다.~~

출처가 다른 두 어플리케이션이 자유로이 리소스를 공유하는 환경은 꽤 위험한 환경이며,
`CSRF(Cross-Site Request Forgery)`, `XSS(Cross-Site Scripting)`등의 공격에 취약해진다.

`SOP`가 없을 때 공격당하는 간단한 시나리오를 보자.
1. 사용자가 `www.bank.com`에 로그인한다(인증 쿠키가 세션에 포함되어있다).
2. 사용자가 `www.bank.com`에 로그인한 상태로 `hacker.com`에 방문한다.
3. `hacker.com`은 사용자 브라우저의 `bank.com`의 인증 세션 쿠키를 읽어 계정에 접근한다.
4. `hacker.com`이 사용자의 `bank.com` 데이터에 접근이 가능해진다.

## HTTP 요청
`CORS`는 `HTTP` 클라이언트 요청과 서버 응답의 메커니즘과 밀접한 관련이 있다. 따라서 이를 이해해야 한다:

- HTTP Method: GET, POST, PUT, DELETE 등.
- Headers:
  - Request Header: 클라이언트가 서버로 보내는 정보 (Origin, Authorization 등).
  - Response Header: 서버가 클라이언트로 보내는 정보 (Access-Control-Allow-Origin 등).
    - Access-Control-Allow-Origin: http://localhost:3000
      - 해당 `Origin`으로 부터의 요청을 허용
    - Access-Control-Allow-Methods: GET, POST, OPTIONS
      - 해당 메서드를 포함한 요청을 허용
    - Access-Control-Allow-Headers: Authorization, Content-Type
      - 서버가 해당 헤더를 포함한 요청을 허용
    - Access-Control-Allow-Credentials: true
      - 서버가 쿠키 또는 인증 정보를 포함한 요청을 허용

**위 예제는 주로 `Preflight` 요청(OPTIONS 요청)에서 사용되며, 클라이언트와 서버 간의 보안과 요청 허용 범위를 제어하는 중요한 메커니즘이다.**
`Preflight` 요청은 브라우저가 `CORS(Cross-Origin Resource Sharing)` 규칙에 따라 실제 요청을 보내기 전에 서버가 요청을 허용하는지 확인하기 위해 보내는 추가 요청이다.
이 요청은 `OPTIONS` 메서드를 사용하며, 서버가 요청을 허용할 수 있는지 검사한다.
> **RESTfuld method에서 OPTION**을 따로 공부할 것 / **`preflight`**

## CORS
요약하자면, **브라우저에서 요청과 응답은 항상 SOP를 지켜야 한다.**
그러나 웹은 매우 거대하고, 외부로부터 리소스를 필요로하는 경우도 많다.
그래서 나온 정책이 `CORS`이다.
**SOP정책을 위반해도 CORS정책을 지킨다면 다른 출처의 리소스라도 허용한다!**
~~개인적으로 CORS에러가 너무 복잡하게 떠서 서버에러처럼 보이는데 그냥 브라우저 스펙이다.~~
**CORS 에러는 서버에서 허용하지 않았기 때문에 브라우저가 클라이언트의 요청을 차단하는 것이지, 서버에서 에러를 반환하는 것은 아니다.**

아래로부터 각종 시나리오를 통해 `CORS 허용, 미허용`예시를 들어보자.

### CORS 미준수 시나리오
개발단계에서 같은 url을 사용함에도 `CORS 미준수 에러`가 뜰 수 있다.
다음과 같은 시나리오를 생각해보자.
1. 개발자가 서버를 Spring, 클라이언트는 React 혹은 Vue로 독립적으로 작업한다.
2. 클라이언트에서 서버로 API 요청을 보낸다.
3. `CORS 에러`가 발생한다.
  - 서버(Spring): `http://localhost:8080`
  - 클라이언트(Vue/React): `http://localhost:3000`
  - 도메인은 같지만 포트가 다르므로, 다른 출처로 간주된다.

아니면 개발서버를 배포해놓고 바탕으로 클라이언트 작업을 해도 마찬가지이다.
1. API 서버가 실제 배포된 도메인(`https://api.example.com`)에 있고, 클라이언트는 로컬(`http://localhost`)에서 개발 중.
2. 클라이언트에서 직접 해당 API를 호출.
3. 서로 다른 도메인 간 요청(`Cross-Origin`)으로 간주되어 차단.

### 난 외부 도메인 호출할 때 CORS 신경 쓴적이 없는데?
대부분의 공공 API나 상용 API(예: 카카오맵 API, 구글 지도 API)는 CORS 문제를 방지하기 위해 서버에서 필요한 CORS 헤더를 포함하여 응답한다.
**카카오맵 API로 예제를 들어보자.**
- 카카오맵 API 서버는 클라이언트에서 요청할 때 다음과 같은 헤더를 추가해 반환한다:
```text
Access-Control-Allow-Origin: *
```
- 이 헤더는 모든 출처로부터의 요청을 허용한다.
- 카카오맵 API와 같은 서비스는 `API 키`를 사용하며, 이를 통해 올바른 사용자를 인증하고 요청을 제어한다.

**하지만 카카오페이 API로 예제를 들어보자.**
- 카카오페이 API는 CORS문제를 방지하고, 보안을 강화하기 위해 클라이언트에서 호출하는 것을 막는다.
- 즉 클라이언트(자바스크립트)에서 `https://kapi.kakao.com`를 엔드포인트로 하고 요청을 보내면, 실행이 되지 않는다.
- 따라서 백엔드를 통해서 요청해야 한다.
  - 클라이언트(Vue/React)에서 `https://kapi.kakao.com`로 직접 요청하면 CORS 문제가 발생한다.
  - 카카오페이 API 서버는 클라이언트의 요청을 허용하도록 설정되어 있지 않다.
  - 브라우저 보안 정책(Same-Origin Policy)에 의해 요청이 차단된다.
  - 이는 백엔드에서 호출하여 브라우저의 `CORS 정책`을 우회하도록 설계된 것이다.

### CORS허용하는 기본 동작
그럼 도대체 `CORS`를 어떻게 허용시켜 주는가...
즉, 다른 `Origin`에서의 요청을 어떻게 서버에서 허용시켜주는가?


1. 클라이언트에서 **HTTP요청의 헤더에 Origin**을 담아 전달
  - `HTTP 요청`이라면 따로 설정을 하지않아도 클라이언트가 서버로 요청을 보내면 **브라우저가 자동**으로 `header`에 아래와 같은 `Origin`데이터를 추가한다.
```text
Origin: http://127.0.0.1:5500
```

2. 서버가 응답 헤더에 `Access-Control-Allow-Origin`을 담아 클라이언트에게 보내준다.
```text
Access-Control-Allow-Origin: http://127.0.0.1:5500
```
  - 만약 허용되지 않은 `Origin`이라면 클라이언트에서 응답 헤더를 볼 수 없다.

3. 이후 응답을 받은 브라우저는 자신이 보냈던 요청의 Origin과 서버가 보내준 응답의 Access-Control-Allow-Origin을 비교해본 후 차단할지 말지를 결정한다.
만약 유효하지 않다면 그 응답을 사용하지 않고 버린다. (CORS 에러 !!)
위의 경우에는 둘다 http://localhost:3000이기 때문에 유효하니 다른 출처의 리소스를 문제없이 가져오게 된다.

해당 디렉토리에 `cors-client.html`과 `cors-server.js`로 버튼을 통해 구현을 하는 예제를 만들어 놓았다.
테스트를 해보도록 하자.