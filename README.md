# paint-board

### basic usage

```js
let range1 = new RangeComp({
    mode : 'lr',
    container : _('#ltr-wrap1'),
    onDragStart : (event) =>{
        console.log(range1.value)
    },
    onDragging : (event) =>{
        console.log(range1.value)
    }
});
```

---

### Demo

- [basic usage](https://17x.github.io/range-comp/)
---

### configs

##### mode `String`
direction: lr, rl, tb, bt
default: lr

##### container `HTMLNodeElement`
main dom

##### onDragStart `Function`
gesture start

##### onDragging `Function`
gesturing

##### onDragEnd `Function`
gesture end
