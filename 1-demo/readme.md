# demo 01

## 我们为什么要测试
简单而言，我们测试是为了验证代码的质量，确保代码按照我们想要的方式来运行。

比如说一个`add`函数
``` js
const add = (a, b) => a + b
```

两个数字输入了之后，我们希望他总是返回两者相加的结果。这时候我们需要写一些脚本来验证他的可行性。
``` js
function test() {
  const rst = add(1, 2)
  if (rst === 3) {
    console.log('test passed!')
  } else {
    console.log('test failed!')
  }
}

test() // test passed!
```

这样，我们没有使用任何工具，即验证了`add`函数是符合我们预期的。虽然这个测试的脚本完全不可扩展，但是它大致展示了测试的一般步骤。

## 测试驱动开发

重新来看我们的`add`函数，是先有了实现，再有测试脚本。在开发的过程中，我们甚至不写测试脚本。我们可以考虑一下**测试驱动开发(TDD)**，即先写好期望的结果，然后根据测试用例去不断完善实现过程。

其实这样是更符合开发流程的，因为我们总是先有需求再去实现的，总不会还没想好我们要实现什么功能就去写实现代码。TDD只是帮我们把这一步更加具象地呈现出来了，并且我们可以依据这个规范去测试我们的实现代码哪里有问题。