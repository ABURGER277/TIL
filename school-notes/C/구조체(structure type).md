# 구조체(Structure Type)
> 구조체를 이해하기 위해서는 다음 예제를 그림으로 그려가며 풃어보는것이 좋다.
## 구조체란?
**여러 종류의 변수를 모아서 한 번에 만들 수 있도록 한 것**
흡사 배열과 유사한 `Type`처럼 느껴지나 배열과 다르게 구성되는 `value`의 `type`이 달라도 사용 가능하다.

### EX
- 배열: 100명의 수학 점수
- 구조체: 1명의 이름, 학번, 수학 점수, ...
- 구조체 배열: 100명의 이름, 학번, 수학 점수, ...

만약 구조체 없이 두 점의 $x, y$좌표를 표시하고자 한다면?
```C
float a_x, a_y;
float b_x, b_y;
```
이런 식으로 4개의 변수를 생성해야 한다.

하지만 구조체를 사용한다면
```C
struct point {
  flaot x;
  flaot y;
} a, b;
```
이렇게 `x`와 `y`라는 구조체를 가진 변수 `a`와 `b`가 만들어진다.

같은 4개의 공간을 사용하지만 구조체를 사용하는게 더 직관적으로 변수를 사용할 수 있다.

또한 구성 요소가 많을수록 구조체가 유리해진다.

## 구조체 생성과 활용
```C
struct point { // struct => 구조체 키워드, point => 구조체 태그(생략 가능)
  float x; // 구조체 멤버
  float y; // 구조체 멤버
} a, b; // 구조체 변수(생략 가능)

struct point c; // 구조체 태그가 선언되어 있다면 그 태그로 변수 생성 가능
```

```C
struct point {
  flaot x;
  flaot y;
} a, b;

a.x = 3.0;
b.y = a.x * 2;

struct point c = {1.0, 2.0};

struct point d = {2.0, 3.0}, e;
e = d; // e = {2.0, 3.0}
```

## 두 점 사이의 좌표를 구하는 함수 만들어보기
```C
struct point {
  float x, y;
}

struct point a, b;
float dis
```

```C
scanf("%f", &a.x);
scanf("%f", &a.y);
scanf("%f", &b.x);
scanf("%f", &b.y);

dis = pow((a.x - b.x), 2) + pow((a.y-b.y), 2); // pow(a, n) = a의 n제곱
dis = sqrt(dis); // sqrt => 제곱근 함수

printf("%f\n", dis);
```

## 구조체 배열
```C
struct point {
  float x, y;
}
struct point a; // stuct point 자체로 하나의 자료형처럼 처리된다.
// 따라서 이런식으로 사용이 가능하다.
struct point b[5] // 5개의 점 배열

b[0].x = 1.0;
b[0].y = 2.0;

b[1] = {1.0, 3.0}
```

## 구조체 포인터
```C
struct point {
  float x, y;
}
struct point a;
struct point *c;

c = &a; // c에 a의 주소를 저장
(*c).x = 7.0; // *c를 통해 a의 공간을 추론 => a.x = 7.0
(*c).y = (*c).x + 2; // 마찬가지로 a.y = a.x + 2
```

## 구조체 배열과 포인터
```C
struct point {
  float x, y;
}

struct point a[5];
struct point *b;

b = a; // b = a[0]
b[1].x = 2.0
(b + 2) -> y = (*(b + 1))
```

## 구조체의 몇가지 문법
**구조체 안에 넣을 수 있는 값 종류**
1. 변수
2. 배열
3. 포인터
4. 다른 구조체 변수

```C
struct point {
  float x, y;
}

struct rect {
  struct point a, b;
}

struct some {
  char a;
  int b[10];
  double *c;
}
```

## 자기 참조 구조체
**구조체 멤버로 자신을 포함하는 경우**
```C
struct self1 {
  int a;
  struct self1 b;
} c;
```
재귀하여 c안에 무한히 a와 b가 생성될 것이다. 따라서 이러한 형태는 불가능 하다.

```C
struct self2 {
  int a;
  struct self2 *b;
} c;
```

`self2`의 주소를 가리킬 수 있는 포인터 변수는 멤버로서 넣을 수 있다.

**구조체 안에 자신에 대한 포인터가 멤버로 포함되어 있는 구조체를 `자기 참조 구조체`라고 한다.**

`typedef`: 사용자가 새로운 자료형 이름을 만들어서 사용할 수 있게 함
```C
typedef int my_int; // int형의 또 다른 이름
my_int a, b, c;
```
- 구조체와 같이 많이 인용된다.
구조체는 struct point와 같이 이름이 길어서
```C
typedef struct point {
  float x, y;
} t_point; // struct poiint 의 또 다른 이름
...
t_point a, b;
```

## 구조체와 함수
구조체를 이용하여 두 점 사이의 거리를 구하는 함수를 만들어보자.
```C
struct point {
  float x, y;
}

float dist(struct point a, struct point b) {
  float d;
  d = pow((a.x - b.x), 2) + pow((a.y-b.y), 2);
  d = sqrt(d);

  return d;
}

int main(void) {
  struct point e, f;
  flaot d;
  scanf("%f", &e.x);
  scanf("%f", &e.y);
  scanf("%f", &f.x);
  scanf("%f", &f.y);

  d = dist(e, f);

  printf("%f\n", d);
}
```

- 함수의 매개변수로 구조체형이 올 수 있다.(인자도 구조체형이어야 한다)
- 인자가 매개변수로 복사된다
  - 값에 의한 호출
  - 각각의 멤버들이 그대로 복사됨
  - 멤버가 많을 경우 비효율적일 수 있다.
    - 따라서 구조체 포인터를 주로 이용한다.
```c
float dist(struct point *a, struct point *b) {
  float d;
  d = pow(((*a).x - (*b).x), 2) + pow(((*a).y-(*b).y), 2);
  d = sqrt(d);

  return d;
}
// 이 함수는 '->'화살표 연산자로 치환이 가능하다.
float dist(struct point *a, struct point *b) {
  float d;
  d = pow((a->x - b->x), 2) + pow((a->y - b->y), 2);
  d = sqrt(d);

  return d;
}
```

그럼 결국 아래와 같이 깔끔하게 정리가 가능하다.
```c
struct point {
  float x, y;
}

float dist(struct point *a, struct point *b) {
  float d;
  d = pow((a->x - b->x), 2) + pow((a->y - b->y), 2);
  d = sqrt(d);

  return d;
}

int main(void) {
  struct point e, f;
  flaot d;
  scanf("%f", &e.x);
  scanf("%f", &e.y);
  scanf("%f", &f.x);
  scanf("%f", &f.y);

  d = dist(&e, &f);

  printf("%f\n", d);
}
```

### 또 다른 예제
한 점을 x, y축으로 각각 a, b만큼 이동하여 반환하는 함수 `shift`만들기
```c
struct point {
  float x, y;
}

struct point shift(struct point a) {
  struct point b;
  b.x = a.x + 5;
  b.y = a.y + 5;

  return b;
}

int main(void) {
  struct point e, f;
  e.x = 2.0;
  e.y = 3.0;

  f = shift(e);
  printf("%f, %f\n", f.x, f.y);
}
```

**구조체 포인터를 사용해서 구현**
```c
struct point {
  float x, y;
}

struct point shift(struct point *a) {
  a->x += 5;
  b->x += 5;
  return;
}

int main(void) {
  struct point e;
  e.x = 2.0;
  e.y = 3.0;

  shift(&e);
  printf("%f, %f\n", e.x, e.y);
}
```
