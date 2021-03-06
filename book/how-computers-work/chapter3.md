> chapter 体验一次手工汇编

因为程序的作用是驱动硬件工作，所以在编写程序之前必须要先了解
微型计算机的硬件信息。

#### 汇编语言

根据表示指令功能的英语单词起一个相似的昵称，并将这个昵称赋予给
0和1的组合。这个类似英语单词的昵称叫做”助记符“，使用助记符的编
程叫做”汇编语言“

汇编语言的语法和英语祈使句的语法很像。若对比英语的祈使句give me
money和汇编语言的语句，就可以看出在英语的祈使句中，一开头放置了
一个标识”做什么“的动词，这个动词就相当于汇编语言中的操作码。在
动词后面放置了一个标识”动作作用到什么上“的宾语，这个宾语就相当于
汇编语言中的操作数。因为程序的作用是向CPU发出指令。

既然数据的运算是在CPU中进行的，那么在CPU内部就应该有存储数据的
地方。这种存储数据的地方叫做”寄存器“。虽然也叫寄存器，但是与I/O
的寄存器不同，CPU的寄存器不仅能存储数据，还具备对数据进行运算的能力

用汇编语言编写的程序是不能直接运行的，必须先转换成机器语言，机器语言是
唯一一种CPU能直接理解的编程语言。

使用汇编语言编程时，因为要事无巨细的列出计算机的行为，所以程序会变得冗长繁复。