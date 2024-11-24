# 간단한 알고리즘 구현
## 제일 큰 수 구하기
### 일차원 배열에서 제일 큰 수 구하기
- 프로그램 구상: 사람은 어떻게 할까?
  - 10개의 수가 주어지고 가장 큰 수를 구해야 한다면 한눈에 보이겠지만,
  - 100개의 수가 주어진다면?
  - 첫 번째 숫자부터 다음 숫자와 하나씩 비교한다.
  - 더 큰 숫자를 머리속에 기억하도록 하며 이를 배열의 끝까지 진행한다.
```c
// 크기가 10인 일차원 배열a에서 제일 큰 수와 그 위치 구하기.
int main(void) {
  int i, a[10];
  int max, idx;

  for(i=0; i<10; i++) {
    scanf_s("%d", &a[i]);
  }
  max = a[0]
  idx = 0;
  for(i=1; i<10; i++) {
    if(a[i] > max) {
      max = a[i];
      idx = i;
    }
  }

  printf("%d %d\n", max, idx)
}
```

## 더 큰 수 세기
### 일차원 배열에 저장되어 있는 수 중에서, 특정한 수보다 큰 수가 몇개 있는지 세어보기
- 프로그램 구상: 사람은 어떻게 할까?
  - 10개의 수가 주어지고 특정한 수보다 큰 수의 개수를 구해야 한다면 한눈에 보이겠지만,
  - 100개의 수가 주어진다면?
  - 첫 번째 숫자부터 특정한 숫자와 비교한 후 더 크다면 개수를 기억한다.
  - 배열의 끝까지 모든 수를 비교하며 더 큰 수가 있을 때 마다 개수를 하나씩 더한다.
```c
int main(void) {
  int i, a[10], target;
  int cnt;

  scanf_s("%d", &target);
  for(i=0; i<10; i++) {
    scanf_s("%d", &a[i]);
  }
  cnt = 0;
  for(i=1; i<10; i++) {
    if(a[i] > target) {
      cnt++;
    }
  }

  printf("%d\n", cnt)
}
```

## 등수 메기기
### 10명의 점수를 입력 받아 저장한 뒤 이들의 등수를 출력하기
- 프로그램 구상: 사람은 어떻게 할까?
  - 가장 큰 수를 찾아서 1등으로 지정한다.
  - 그 다음으로 큰 수를 찾아서 2등으로 지정한다.
  - 이를 9번 반복하고, 마지막 수를 10등으로 지정한다.
- 자신의 등수 = `자신보다 높은 점수의 개수 + 1` 이다.
  - 각각의 요소 a[i]에 대해 배열 a에 있는 요소들 중 a[i]보다 더 큰것이 몇개인지 세기

```c
int main(void) {
  int i, a[10], b[10];
  int cnt;

  for(i=0; i<10; i++) {
    scanf_s("%d", &a[i]);
  }
  for(i=0; i<10; i++) {
    cnt = 0;
    for(j=0; j<10; j++) {
      if(a[j] > a[i]) {
        cnt++;
      }
    }
    b[i] = cnt + 1;
  }

  printf("%d\n", b[i])
}
```

## 정렬 알고리즘과 선택 정렬
정렬(sorting): 데이터를 어떠한 특정한 기준에 따라 순서대로 나열하는 것
- 선택 정렬
- 삽입 정렬
- 거품 정렬
- 퀵 정렬
- 합병 정렬 등

### 선택 정렬
사람이 하는것과 유사한 가장 직관적인 알고리즘이다.
- 사람을 키 순서대로 정렬하기
  - 가장 키가 작은 사람을 찾는다.
  - 그 사람을 맨 앞사람과 바꾼다..
  - 남은 사람들 중 가장 키가 작은 사람을 두 번째 사람의 위치와 바꾼다.
  - 이 과정을 마지막까지 반복한다.

10개의 수가 채워져 있는 배열 a[10]을 오름차순으로 정렬하는 알고리즘을 만들어보자.
1. 0 ~ 9번 중 가장 작은 것 선택: idx => a[0]과 a[idx] 교환
2. 1 ~ 9번 중 가장 작은 것 선택: idx => a[1]과 a[idx] 교환
3. 2 ~ 9번 중 가장 작은 것 선택: idx => a[2]과 a[idx] 교환
4. ...
5. 8 ~ 9번 중 가장 작은 것 선택: idx => a[8]과 a[idx] 교환
```c
int main(void) {
  int i, a[10];
  int min, idx, temp;

  scanf_s("%d", &target);
  for(i=0; i<10; i++) {
    scanf_s("%d", &a[i]);
  }

  for(i=0; i<9; i++) {
    min = 9999;
    for(j=i; j<10; j++) {
      if(a[j] < min) {
        min = a[j];
        idx = j;
      }
    }
    tmp = a[idx];
    a[idx] = a[i];
    a[i] = tmp;
  }

  for(i=0; i<10; i++) {
    printf("%d\n", a[i])
  }
}
```

### 거품 정렬 Bubble정렬
- 사람을 키 순서대로 정렬하기
  - 첫 번째 사람과 두 번째 사람을 비교하여 정렬한다.
  - 두 번째 사람과 세 번째 사람을 비교하어 정렬한다.
  - 이를 마지막 아홉 번째 사람과 열 번째 사람까지 비교하여 정렬한다.
  - 다시 첫 번째 사람과 두 번째 사람을 비교하여 정렬한다.
  - 두 번째 사람과 세 번째 사람을 비교하여 정렬한다.
  - 이를 여덟 번째 사람과 아홉 번째 사람까지 비교하여 정렬한다.
  - 이 모든 과정을 앞 두 사람만 남을 때 까지 반복한다.

```c
int main(void) {
  int i, j, a[10];
  int temp;

  for (i = 0; i < 10; i++) {
    scanf_s("%d", &a[i]);
  }

  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9 - i; j++) {
      if (a[j] > a[j + 1]) {
        temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }

  for (i = 0; i < 10; i++) {
    printf("%d\n", a[i]);
  }
}
```
## 2차원 배열과 함수 실습
### 2차원 배열을 초기화 한 뒤, 가로 합과 세로 합, 전체 합 출력하기
2차원 배열 a[4][4]가 주어진다.
1. 2차원 배열을 초기화 한다.
2. 가로 합 4개를 출력한다.
3. 세로 합 4개를 출력한다.
4. 전체 합을 출력한다.

```c
int main(void) {
  int i, j, a[4][4];
  int sum;

  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      scanf_s("%d", &a[i][j]);
    }
  }

  // 가로 합 4개
  for(i=0; i<4; i++) {
    sum = 0;
    for(j=0; j<4; j++) {
      sum += a[i][j];
    }
    printf("row %d sum = %d\n", i, sum);
  }

  // 세로 합 4개
  for(j=0; j<4; j++) {
    sum = 0;
    for(i=0; i<4; i++) {
      sum += a[i][j];
    }
    printf("col %d sum = %d\n", j, sum);
  }

  sum = 0;
  for(j=0; j<4; j++) {
    for(i=0; i<4; i++) {
      sum += a[i][j];
    }
  }
  printf("all sum = %d\n", sum);
}
```

### 두 행렬의 합과 차를 구하여 출력하기
두 2차배열의 합 행렬을 먼저 출력 후 차 행렬을 출력한다.

```c
int main(void) {
  int i, j, a[4][4], b[4][4];
  int sum[4][4], dif[4][4];

  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      scanf_s("%d", &a[i][j]);
    }
  }

  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      scanf_s("%d", &b[i][j]);
    }
  }

  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      sum[i][j] = a[i][j] + b[i][j];
      dif[i][j] = a[i][j] - b[i][j];
    }
  }

  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      printf("%d ", sum[i][j]);
    }
    printf("\n");
  }

  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      printf("%d ", dif[i][j]);
    }
    printf("\n");
  }
}
```

### 두 정수 사이의 지수승을 계산하는 함수 작성하기
함수에서 `받는` 두개의 정수 a, b가 있을 때 `a의 b승`을 계산하여 `반환`하는 함수를 작성한다.

```c
int main(void) {
  int c, d, e;
  scanf("%d", &c);
  scanf("%d", &d);
  e = power_int(c, d);
  printf("%d\n", e);
  return 0;
}

int power_int(int a, int b) {
  int i, mul;
  for(i=0, mul =1; i<b; i++) {
    mul *= a;
  }
  return mul;
}
```

### 정수의 제곱을 구하는 함수 sq()와 세제곱을 구하는 함수cu()를 작성하기
조건
1. cu()에서는 sq()함수를 호출하여 사용하도록 할것
2. mian함수에서 다섯제곱수를 cu()와 sq()를 사용하여 구한 뒤 출력한다.

```c
int sq(int a) {
  int res;
  res = a * a;
  return res;
}

int cu(int a) {
  int res;
  res = sq(a) * a;
  return res;
}

int mian(void) {
  int num;
  int result;
  scanf("%d", &num);
  result = sq(num) * cu(num);
  printf("%d \n", result);
}
```

### 정수형 1차원 배열을 2개 받아서, 한 쪽의 값을 다른 쪽으로 복사하는 함수 작성하기
조건
1. 20개 이하의 정수 n을 표준 입력으로 받고 n개의 정수를 표준 입력으로 받아 배열 a에 저장하기
2. 앞에서 만든 함수를 이용하여 배열 a에 저장된 값들을 배열 b로 복사하기.
3. 배열 b에 저장된 값들을 출력하기

```c
void copy(int c[], int d[], int n) {
  int i;
  for(i=0; i<n; i++) {
    d[i] = c[i];
  }
  return;
}

int main(void) {
  int a[20], b[20], n;
  int i;

  scanf("%d" &n)
  for(i=0; i<n; i++) {
    scanf("%d", &a[i])
  }

  copy(a, b, n);

  for(i=0; i<n; i++) {
    printf("%d \n", b[i]);
  }
}
```
