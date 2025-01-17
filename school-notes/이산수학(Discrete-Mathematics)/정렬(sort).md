# 정렬 Sort
> https://visualgo.net/en

## 정렬의 개념
**정렬: `순서 없이` 배열된 자료들을 `일정한 순서`에 따라 `재배열` 하는 것**

키(Key): 자료의 정렬 시 사용되는 기준 값

## 정렬의 중요성
데이터 정렬의 이유: `탐색`

데이터를 정렬하는 것은 이후 데이터에서 원하는 데이터를 탐색하기 위함이다.
- 엄청난 크기의 데이터에서 자료를 찾아야 한다면?
- => 데이터가 정렬되어 있어야 효과적인 탐색이 가능하다.

데이터를 어떻게 효율적으로(빠르고 정확하게) 정렬하는지가 중요하다.

## 정렬의 종류
기본적인 정렬의 종류에는 여러가지가 있다.
1. 선택 정렬
2. 버블 정렬
3. 삽입 정렬
4. 셸 정렬
5. 퀵 정렬
6. 병합 정렬
7. 기수 정렬
8. 트리 정렬

이 외에도 여러가지 정렬 방식이 있으며, 여러가지를 섞어 효율적인 정렬 방법도 있다.(팀TIM 병렬)

### 선택 정렬
`Selection Sort`: 전체 원소들 중에서 `기준 위치에 맞는 원소를 선택`하여 자리를 교환한다.

**정렬 방식**

1. 주어진 데이터 중에서 최소값을 가지는 위치를 찾는다.
2. 최소값을 맨 앞에 위치한 값과 교환한다.
3. 정렬된 데이터를 제외한 나머지 데이터를 같은 방법으로 정렬한다.

시간 복잡도: $o(n^2)$

#### 코드 로직
```js
function selectionSort(a[], n)
  for(i =0 ; i < n-1; i = i+1)
    min = i;
    for(j = i+1; j < n; j = j+1)
      if(a[j] < a[min])
        min = j;
    swap(a[i], a[min]);

function swap(x, y)
  temp = x;
  x = y;
  y = temp;
```

- n개의 메모리 사용
- 공간 복잡도: $o(n)$
- 비교 횟수:
$
\sum_{i=0}^{n-2}{n-i-1}=
\frac{n(n-1)}{2} = \frac{1}{2} n^2 - \frac {1}{2}n
$
- 시간 복잡도: $o(n^2)$

### 버블 정렬
`Bubble Sort`: `인접한` 두개의 원소를 비교하여 `자리를 교환`
- 시간 복잡도: $o(n^2)$
- 코드가 `매우 단순`하여 `자주` 사용된다.


**정렬 방식**

1. 첫 번째 데이터부터 다음 데이터와 비교하여 위치를 이동한다.
2. 맨 마지막까지 반복하면 가장 큰 수가 맨 뒤로 가있다.
3. 정렬된 데이터를 제외하고 나머지 데이터를 같은 방법으로 반복한다.

#### 코드 로직
```js
function bubbleSort(a[], n)
  for(i = n-1; i >= 0; i = i-1)
    for(j = 1; j <= i; j = j+1)
      if(a[j-1] > a[j])
        swap(a[j-1], a[j]);
```

- n개의 메모리 사용
- 공간 복잡도: $o(n)$
- 비교 횟수:
$
\sum_{i=0}^{n-1}{i}=
\frac{n(n-1)}{2}
$
- 시간 복잡도: $o(n^2)$

### 삽입 정렬
`Insert Sort`

**정렬 방식**
1. 배열을 `정렬된 부분집합 S`와 정렬되지 않은 `나머지 원소들의 부분집합 U`로 분할
2. U의 원소를 S의 마지막 원소부터 비교하면서 위치를 찾아 S에 삽입하고 S와 U를 업데이트
3. 위의 과정을 반복
- 시간 복잡도: $o(n^2)$

#### 코드 로직
```js
function insertSort(a[], n)
  for(i = 1; i < n; i = i+1)
    index = a[i];
    j = i-1;
    while((j >= 0)&&(index < a[j]))
      a[j+1] = a[j];
      j = j-1;
    a[j+1] = index;
```

- n개의 메모리 사용
- 공간 복잡도: $o(n)$
- 비교 횟수:
  - 이미 정렬되어 있는 경우: $n-1$
  - 역으로 정렬되어 있는 경우: $\frac{n(n-1)}{2}$
- 평균 시간 복잡도:
$
\sum_{i=1}^{n-1}{\frac{i}{2}}=
\frac{n(n-1)}{4}
$

### 셸 정렬
`Shell Sort`: 창안자의 이름에서 유래

**정렬 방식**
1. 배열을 `일정한 간격(h)`에 위치한 데이터들로 이루어진 `부분집합`으로 분할
2. 각 `부분집합을 삽입정렬을 이용`해 정렬
3. `H를 반으로 줄인 후` 위의 과정을 반복
4. 부분집합으로 나누어 정렬을 하게 되면 `비교 연산과 교환 연산`의 개수가 줄어듦
- 시간 복잡도: $o(n^2)$


#### 코드 로직
```js
function shellSort(a[], n)
  interval = n;
  while(interval >= 1)
    interval = interval/2;
    for(i = 0; i < interval; i = i+1)
      intervalSort(a[], i, n, interval);

function intervalSort(a[], begin, end, interval)
  for(i = begin + interval; i <= end; i = i+interval)
    index = a[i];
    j = i-interval;
    while((j >= begin)&&(index < a[j]))
      a[j+interval] = a[j];
      j = j-interval;
    a[j+interval] = index;
```

- n개의 메모리 사용
- 공간 복잡도: $o(n)$
- 비교 횟수:
  - 이미 정렬되어 있는 경우: $n-1$
  - 역으로 정렬되어 있는 경우: $\frac{n(n-1)}{2}$
- 평균 시간 복잡도:
$
\sum_{i=1}^{n-1}{\frac{i}{2}}=
\frac{n(n-1)}{4}
$

### 퀵 정렬
`Quick Sort`

**정렬 방식**
1. 배열의 `가운데 원소를 기준값(Pivot)`으로 선택
2. `왼쪽 끝에서 오른쪽`으로 움직이면서 기준값보다 `크거나 같은 원소를 L`로 표시
3. `오른쪽 끝에서 왼쪽`으로 움직이면서 기준값보다 `작은 원소를 R`로 표시
(만약 R이 L과 만나면 멈춘다.)
4. L과 R을 서로 교환
5. L과 R이 만나면 `기준값과 R`을 서로 교환
6. 위 과정을 `반복`수행
- 시간 복잡도: $o(n\log{n})$
  - $o(n^2)보다 작다.$


#### 코드 로직
```js
function quickSort(a[], left, right)
  l = left;
  r = right;
  pivot = (l + r) / 2;

  while(l < r)
    while(a[l] < a[pivot]) l++;
    while(a[r] > a[pivot]) r--;
    if(r < l) r = l;
    if(l < r) swap(a[l], a[r]);

  swap(a[pivot], a[r]);
  if(left < r) quickSort(a[], left, r-1);
  if(right > l) quickSort(a[], l+1, right);
```

### 병합 정렬
`Merge Sort`

**정렬 방식**
1. 분할: 전체 데이터를 `부분집합`으로 분할
2. 정렬: 각 부분집합에 대해 `정렬 작업`을 수행
3. 병합: 정렬된 부분집합을 `병합`
- 시간 복잡도: $o(n\log{n})$

#### 코드 로직
```js
function mergeSort(a[], left, right)
  middle = (left + right)/2;

  if((right-left) >= 1)
    mergeSort(a, left, middle);
    mergeSort(a, middle+1, right);
    merge(a, left, middle, right)

function merge(a[], left, middle, right)
  i = left;
  j = middle + 1;
  k = left;
  while((i <= middle) && (j <= right))
    if(a[i] <= a[j]) sorted[k++] = a[i++];
    else             sorted[k++] = a[j++];

  if(i > middle)
    while(k <= right) sorted[k++] = a[j++];
  else
    while(k <= right) sorted[k++] = a[i++];

  a = sorted;
```

### 기수 정렬
> `큐(Queue)`: `FIFO(First In Frist Out)`구조를 가지는 메모리의 한 형태
`Radix Sort`

**정렬 방식**
1. 진법의 Digit Set(n진법)에 해당하는 버킷을 `큐에 생성`
2. 맨 하위 자리에서 시작하여 정렬할 `양의 정수`를 해당 자릿수에 해당하는 `버킷에 EnQueue(적재)`
3. 버킷의 순서대로 `원소를 DeQueue(수행)`
4. 위의 과정을 `모든 자릿수에 대해 반복` 수행
5. `양의 정수`로 이루어진 데이터에 대해서만 정렬이 가능
- 시간 복잡도: $o(d(n+r))$
  - r: 기수
  - d: 자릿수


#### 코드 로직
```js
function radixSort(a[], n, radix, d)
  pow = 1;

  createBucket(bucket[][]);

  for(i = 0; i < d; ++i)
    for(j = 0; j < n; ++j)
      index = (a[j]/pow)%radix;
      EnQueue(bucket[index][], a[j]);

    for(index = 0; index < radix; index++)
      DeQueue(bucket[index][]);

    pow = pow * radix;
```

### 트리 정렬
> 트리정렬도 Queue메모리 구조를 사용한다.
`Tree Sort`
- `이진 탐색 트리(Binary Search Tree)`
- :노드에 저장된 `데이터의 내용에 대한 크기 기준`을 정하고 이 기준에 따라 `노드의 위치`를 정해놓은 이진 트리
1. 모든 노드는 `서로 다른 유일한 키`를 가진다.
2. `왼쪽 서브 트리`에 있는 모든 노드는 루트노드보다 `작은 키`를 가진다.
3. `오른쪽 서브 트리`에 있는 모든 노드는 루트노드보다 `큰 키`를 가진다.
4. 왼쪽 서브 트리와 오른쪽 서브 트리도 `이진 탐색 트리`이다.

- 트리의 중위순회: `왼쪽 자식노드 => 부모노드 => 오른쪽 자식노드`순서로 순회한다.

**정렬 방식**
1. 정렬할 원소들을 `이진 탐색 트리`로 구성
2. `중위 순회 방법`을 사용하여 트리를 순회한다. => `오름차순 정렬`
- 시간 복잡도: $o(n\log{n})$


#### 코드 로직
```js
function treeSort(a[], n)
  for(i = 0; i < n; i++)
    // 이진 탐색 트리 만드는 함수
    insert(a[i], binarySearchTree);
  // 중위 순회 함수
  inOrder(binarySerachTree)
```
