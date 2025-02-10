# 배열 인스턴스 메서드 정리
> MDN을 참조하여 작성했습니다.
> > MDN에서 명세서를 보시면 `thisArgs`라는 인자가 자주 나옵니다. 콜백함수에서 `this`사용을 위해 있는 인자인데, `thisArgs`대신 화살표 함수를 사용하는것이 좋다고 생각합니다.
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
console.log([1,2,3,4,5].fill(9,-3,-1)); // [1,2,9,9,5]
```
### Array.prototype.filter()
`filter`메서드는 주어진 배열을 **복사**하고 콜백함수로 테스트를 만들어 통과된 요소들만 반환한다.

```js
const numArr = [1,2,3,4,5,6];
const evenNumber = numArr.filter((num) => num % 2 === 0);
console.log(numArr, evenNumber)
// [ 1, 2, 3, 4, 5, 6 ] [ 2, 4, 6 ]
```
위와 같은 동작 방식이 기본적인 `filter()`의 동작 방식이다.

근데 `filter()`에는 `cbFunc()`(콜백함수) 말고도 `thisArgs`라는 두번째 인자 삽입이 가능하다.

`filter(cbFunc, thisArgs)`

`thisArg`는 객체 메서드 내부에서 `this`를 유지하며 `filter()` 같은 배열 메서드를 사용할 때 유용하다.
근데 `arrowFunction`을 사용해서 하면 더 직관적으로 작성 가능해서 굳이 안써도 된다.

### Array.prototype.find()
`find`는 주어진 배열에서 조건을 만족하는 첫 번째 요소를 반환한다.

만족하는 요소가 없다면 `undefined`를 반환한다.

`find()`를 사용하기 전에 본인이 어떤 작업을 할것인지 명확히하자.
아래의 함수들로 더 짧고 좋은 코드를 작성 가능하다.
- 조건을 만족하는 첫 요소의 `index`를 찾는다면 `findIndex()`
- 알고있는 값의 `index`를 찾는다면 `indexOf()`
- 값이 **존재**하는지 찾아야 하는 경우 `includes()`
- 제공된 테스트를 만족하는 요소가 있는지 찾아야 하는 경우 `some()`
- 주어진 테스트 함수를 만족하는 요소를 모두 찾아야 한다면 `filter()`

`find(cbFn, thisArg)`
```js
const arr = [2,100,20,30,5];
console.log(arr.find(num => num > 10))
// 100
```

### Array.prototype.findIndex()
`findIndex()` 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다.

만족하는 요소가 없으면 -1을 반환한다.
```js
const arr = [2,100,20,30,5];
console.log(arr.findIndex(num => num > 10))
// 1
```

### Array.prototype.findLast()
`findLast()` 메서드는 배열을 역순으로 순회하며 제공된 테스트 함수를 만족하는 첫 번째 요소의 값을 반환한다.

테스트 함수를 만족하는 요소가 없으면 `undefined`가 반환된다.

```js
const arr = [2,100,20,30,5];
console.log(arr.findLast(num => num > 10))
// 30
```

### Array.prototype.findLastIndex()
`findLastIndex()` 메서드는 배열을 역순으로 순회하며 주어진 판별 함수를 만족하는 배열의 첫번째 요소의 인덱스를 반환한다.
만족하는 요소가 없으면 -1을 반환한다.

```js
const arr = [2,100,20,30,5];
console.log(arr.findLastIndex(num => num > 10))
// 3
```

### Array.prototype.flat()
모든 하위 배열 요소가 지정된 깊이까지 재귀적으로 연결된 새 배열을 생성한다.
`flat()` `flat(depth)`
`depth`는 `Optional`이다. 없어도 된다. 기본값은 **1**이다.

```js
const arr1 = [1,2,[3,4]];
cosnole.log(arr1.flat()); // [1,2,3,4]

const arr2 = [1,[2,[3,[4,[5,[6]]]]]];
console.log(arr2.flat(3)); // [ 1,2,3,4,[5,[6]]]
console.log(arr2.flat(Infinity)) // [1,2,3,4,5,6]
```

참고로 `flat()`으로 반환된 배열은 기존 배열의 빈 요소(`empty Item`)를 무시한다.
그러나 남아있는 중첩요소들의 `empty Item`은 유지된다.
```js
const arr1 = [1,,3,,5,,7,,9];
console.log(arr1.flat()); // [ 1, 3, 5, 7, 9 ]

const arr2 = [1,,3,['a',,'c']];
console.log(arr2.flat()); // [ 1, 3, 'a', 'c' ]

const arr3 = [1,,3,,5,['a',,'c',,['가',,,'라',[],[],['i','ii',,'iiii']]]];
console.log(arr3.flat());
//[1, 3, 5, 'a', 'c', ['가', <2 empty items>, '라', [], [],    [ 'i', 'ii', <1 empty item>, 'iiii' ]]]
console.log(arr3.flat(2));
//[1,  3,  5,  'a',  'c',  '가', '라', [], [], [ 'i', 'ii', <1 empty item>, 'iiii' ]]
console.log(arr3.flat(infinity));
//[1, 3, 5, 'a', 'c', '가','라', 'i', 'ii','iiii']
```

**직관적으로 flat을 사용하려면 `flat()`이나 `flat(Infinity)`를 사용하도록 하자.**

### Array.prototype.flatMap()
`flatMap()` 메서드는 배열의 각 요소에 주어진 콜백 함수를 적용한 다음 그 결과를 한 단계씩 평탄화하여 형성된 새 배열을 반환한다.
`map()` 뒤에 1depth의 `flat()`을 붙이는 것`(arr.map(...args).flat())`과 동일하지만, 두 메서드를 따로 호출하는 것보다 약간 더 효율적이다.

```js
const arr1 = [1, 2, 1];
const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));
console.log(result);
// [1, 2, 2, 1]

const arr2 = [1, 2, 3];
const result = arr2.flatMap(num => [num, num * 2]);
console.log(result);
// [1, 2, 2, 4, 3, 6]
```

복잡한 작업을 도와주고 알고리즘 짤때 알고있으면 유용할것 같지만... 실무에서 어디다 써야할지는 잘 모르겠다.

### Array.prototype.forEach()
`forEach()` 메서드는 각 배열 요소에 대해 제공된 함수를 한 번씩 실행한다. `empty Item`에는 실행안된다.

반환값은 없다.
- **만약 요소마다 함수를 적용해서 새 배열을 반환하고 싶은거라면 `map()`함수를 사용하자.**

```js
const arr = [1,2,3,4,5];
let sum = 0;
arr.forEach(num => sum += num);
```
`forEach()`함수는 굉장히 범용성이 넓기에 여러 방면으로 활용이 가능하다.
따라서 몇 가지를 주의하며 사용하도록 하자.

1. `forEach()`는 배열의 초기 길이(`length`) 에 따라 실행되며, 실행 도중 배열이 변경되더라도 특정한 규칙을 따른다.
```js
const arr = [1,2,3,4,5];
arr.forEach(num => arr.push(num));
console.log(arr)
// [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
```
**초기 length가 5**이기 때문에 다섯번만 실행되는 모습.

2.  아직 방문하지 않은 요소를 변경하면 변경된 값이 사용됨
```js
const arr = [1,2,3,4,5,6,7,8,9,10];
arr.forEach((num, index) => {
  arr[index++] *=  arr[index];
});

console.log(arr)
// [
//         1,     2,      6,
//        24,   120,    720,
//      5040, 40320, 362880,
//   3628800,   NaN
// ]
```

3. 삭제된 요소는 forEach()가 방문하지 않음
```js
const arr = [1, 2, 3];

arr.forEach((num, index) => {
  if (index === 1) {
    arr.splice(2, 1);
  }
});

console.log(arr, arr.length); // [1, 2], 2
```

### Array.prototype.includes()
`includes()` 메서드는 배열의 항목에 특정 값이 포함되어 있는지를 판단하여 적절히 true 또는 false를 반환한다.
`includes(searchElement, fromIndex)`에서 `fromIndex`는 optional이다. 기본값은 0이다.
검색을 시작할 `Index`를 지정해줄 수 있다.
```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(1, 1); // false
[1, 2, 3].includes(3, 3); // false => fromIndex가 length보다 길면 false를 반환한다.
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
["1", "2", "3"].includes(3); // false

// empty Item을 undefined로 검색 가능하다.
[1, , 3].includes(undefined); // true
```

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
