# test-lessons

test-lessons是一套JavaScript测试入门的指南，解释了
*	我们为什么需要测试
*	测试什么
*	不同场景怎么测试
*	测试需要达到什么样的目标

同时，在讲解的过程中，会逐渐介绍一些相关的工具
*	测试框架，比如**Mocha**
*	断言库，比如**assert**或者**Chai**
*	不同的断言风格，比如`assert`或者`expect`以及`should`
*	代码覆盖率，比如**istanbul**
*	辅助工具，比如**jsdom**和**sinon**
*	终极测试工具，**Jest**
*	Jest测试Vue单文件组件

这篇指南并没有事无巨细地写，比如很多工具的安装、环境的配置、变量的引入等等，大家自己看demo里的代码自行体会。

另外，本课程还附带了一个PPT放在[google docs](https://docs.google.com/presentation/d/1Iz0UNHNV3Jf5XjaMzvMC8GXoUbpNN-6ZHBUbMrVm21A/edit?usp=sharing)上。欢迎大家分享。

所有的栗子里，请大家都运行一个命令来执行测试：
``` shell
$ npm run test
```