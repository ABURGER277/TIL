# 배열 인스턴스 메서드 정리
> static Method는 제외하였습니다.
> abc 순으로 작성

## Method 요약본
`[1,2,3] => [3]` [arr.at(-1)](#arrayprototypeat)
`['a','b','c'] ['d','e','f'] => ['a','b','c','d','e','f']` [arr1.concat(arr2)](#arrayprototypeconcat)
`[1,2,3,4,5] => [1,2,3,3,4]` [arr.copyWithin(3,2)](#arrayprototypecopywithin)
`['a','b','c'] => <iterator{}>{0:'a'},{1:'b'},{2:'c'}` [arr.entries()](#arrayprototypeentries)
`[2, 4, 8] => true` [arr.every(num => num % 2 === 0)](#arrayprototypeevery)



...작성중입니다.
## Instance Methods
### Array.prototype.at()
`Array.prototype.at()`은 `number`를 인수로 받아 해당 `index`의 값을 반환한다.
> :?: 그럼 array[i]와 array.at(i)랑 같은거 아닌가?

`Array.at()`함수는 인수로 양수 뿐 아니라 음수 `-n`을 할당할 수 있으며, 이는 배열의 마지막 항목으로부터 거슬러 센다.
```js
console.log(numberArr[2]); // 3
console.log(numberArr.at(2)); // 3
console.log(numberArr[-2]); // undefined
console.log(numberArr[numberArr.length -2]); // 9
console.log(numberArr.at(-2)); // 9
```
배열을 뒤에서부터 count하여 반환해야 할 때 유용하다.

### Array.prototype.concat()
`Array.concat()`은 두 배열을 병합하여 새로운 배열을 반환한다.
```js
const demo1 = ['a', 'b', 'c'];
const demo2 = ['d', 'e', 'f'];
const concatArr1 = demo1.concat(demo2);
const concatArr2 = demo2.concat(demo1);
console.log(concatArr1, '&', concatArr2);
// [ 'a', 'b', 'c', 'd', 'e', 'f' ] & [ 'd', 'e', 'f', 'a', 'b', 'c' ]
```

`concat()`함수를 사용할 때 다음 사항에 유의하자.
- 두 배열을 합쳐 새로운 배열을 반환한다. => 기존 배열에 영향을 주지 않으며 얕은 복사본을 생성한다.
- 두 소스 배열 중 하나라도 희소배열(undefined된 비어있는 배열 요소)이 있다면 그 슬롯을 보존한다.

### Array.prototype.copyWithin()
배열의 일부를 같은 배열의 다른 위치로 얕게 복사하는 함수이다.
배열을 변경하는 함수이다.
예제부터 보자.
```js
console.log(numberArr.copyWithin(0))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(numberArr.copyWithin(0, 1))
// [2, 3, 4, 5, 6, 7, 8, 9, 10, 10]
console.log(numberArr.copyWithin(0, 9));
// [10, 3, 4, 5, 6, 7, 8, 9, 10, 10]
console.log(numberArr.copyWithin(0, 3, 6));
// [5, 6, 7, 5, 6, 7, 8, 9, 10, 10]
```
:?: 이게 뭔 미친함수인가?
함수 인터페이스 설명서를 좀 더 봐보자.
```js
copyWithin(target, start)
copyWithin(target, start, end)
```
`target`: 복사된 요소를 붙여넣을 인덱스다. 음수를 사용하면 배열 끝에서부터 계산된다.
`start`: 복사를 시작할 인덱스다(포함). 기본값은 0.
`end`:	복사를 종료할 인덱스다(제외). 기본값은 arr.length.

특징으로서는
- 원본 배열을 수정한다.
- 배열의 크기는 변경되지 않는다.
- **중첩된 복사**를 수행하며, 덮어쓰기(overwriting)가 발생할 수 있다.

다시 아까 예제를 첫 문장부터 보자.
`console.log(numberArr.copyWithin(0))`
`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`에서 0번째 인덱스를 선택하여 거기부터 붙여넣을 것이다.
`start`를 지정해주지 않았으므로 기본값인 0번째 인덱스가 선택된다
=> 아무런 동작이 일어나지 않는다.

`console.log(numberArr.copyWithin(0, 1))`
`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`에서 0번째 인덱스를 선택하여 거기부터 붙여넣을 것이다.
`start`의 값은 1, `end`의 값은 9(`numberArr.length`)이므로 `[2, 3, 4, ... , 10]`이 복사되어 target인 0번째로 copy된다.
=> `[2, 3, 4, 5, 6, 7, 8, 9, 10, 10]`

`console.log(numberArr.copyWithin(0, 9));`
아까 `copyWithin()`으로 인해 `numberArr`의 값이 `[2, 3, 4, 5, 6, 7, 8, 9, 10, 10]`로 변경되었다
`start`의 값은 9, `end`의 값은 9(`numberArr.length`)이므로 `[10]`이 복사되어 target인 0번째로 copy된다.
=> `[10, 3, 4, 5, 6, 7, 8, 9, 10, 10]`

`console.log(numberArr.copyWithin(0, 3, 6));`
아까 `copyWithin()`으로 인해 `numberArr`의 값이 `[10, 3, 4, 5, 6, 7, 8, 9, 10, 10]`로 변경되었다
`start`의 값은 3, `end`의 값은 6이므로 `[5, 6, 7]`이 복사되어 target인 0번째로 copy된다.
**end index의 값은 복사 대상에서 제외된다. 즉 `8`은 복사되지 않는다.**
=> `[5, 6, 7, 5, 6, 7, 8, 9, 10, 10]`

**특정한 데이터 이동, 회전 또는 배열 내부 재구성이 필요한 특수한 요구가 있을 때 효율적이다.**

### Array.prototype.entries()
**`[a, b, c] => <iterator>{0: a}, {1: b}, {2: c}`**
`Array.entries()`메서드는 배열의 각 인덱스에 대하여 {키: 값} 쌍으로 이루어진 `Iterator객체`를 반환한다(**Array가 아니다.**).

아래와 같이 사용 가능하다.
```js
const testArr = ['A', 'B', 'C'];
const entriedArr = testArr.entries();

console.log(entriedArr); // Object [Array Iterator] {}
console.log(Array.isArray(entriedArr)); // false

for(const [index, value] of entriedArr) {
  console.log(index, ':', value);
}
// 0 : A
// 1 : B
// 2 : C
```

### Array.prototype.every()
**`[1, 2, 3] => true || false`**
`Array.every()`메서드는 배열의 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트 한다.
**빈 배열은 true를 반환한다.**

이 함수는 `.every(callbackFn)` or `.every(callbackFn, thisArgs)`형태로 이루어진다.
배열의 각 요소들에 대해 `callbackFn`을 한번씩 호출하고 `false`가 나올 때 까지 호출을 반복한다.
`거짓`요소가 발견되면 `false`를 반환하고 배열 순회를 중지한다.
```js
const result1 = numberArr.every((data) => Number.isInteger(data));
console.log(result1); // true
const result2 = numberArr.every((data) => data > 5);
console.log(reuslt2) // false
```

**every()의 용도는 boolean을 반환 시키는 용도이다.**
배열의 모든 부분을 순환한다고 배열의 내용을 변경시키는 것은 불가능하다..
```js
numberArr.every((data) => data = 10);
console.log(numberArr); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
```

### Array.prototype.fill()
Index 범위를 지정해주고 해당 요소들을 바꾼다.
`fill(value, start, end)`

**`start`, `end`**에는 Index값인 정수를 넣어야 한다.
범위는 **`end`의 직전**까지이다. `end`는 포함되지 않는다.
이 둘은 `optional` 즉, 없어도 된다.
 **`at()`처럼 동작한다.(음수도 넣을 수 있다.)**

```js
console.log([1,2,3,4,5].fill(9)); // [9,9,9,9,9]
console.log([1,2,3,4,5].fill(9,1)); // [1,9,9,9,9]
console.log([1,2,3,4,5].fill(9,1,3)); // [1,9,9,4,5]
console.log([1,2,3,4,5].fill(9,-1)); // [1,2,3,4,9]
console.log([1,2,3,4,5].fill(9,-3,-1)); // [1,2,3,9,9]
```
### Array.prototype.filter()
### Array.prototype.find()
### Array.prototype.findIndex()
### Array.prototype.findLast()
### Array.prototype.findLastIndex()
### Array.prototype.flat()
### Array.prototype.flatMap()
### Array.prototype.forEach()
### Array.prototype.includes()
### Array.prototype.indexOf()
### Array.prototype.join()
### Array.prototype.keys()
### Array.prototype.lastIndexOf()
### Array.prototype.map()
### Array.prototype.pop()
### Array.prototype.push()
### Array.prototype.reduce()
### Array.prototype.reduceRight()
### Array.prototype.reverse()
### Array.prototype.shift()
### Array.prototype.slice()
### Array.prototype.some()
### Array.prototype.sort()
### Array.prototype.splice()
### Array.prototype.toLocaleString()
### Array.prototype.toReversed()
### Array.prototype.toSorted()
### Array.prototype.toSpliced()
### Array.prototype.toString()
### Array.prototype.unshift()
### Array.prototype.values()
### Array.prototype.with()
