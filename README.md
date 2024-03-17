# webgl
### gl.drawArrays(mode, first, count)方法可以绘制的图形
1. POINTS 可视的点
2. LINES 单独线段
3. LINE_STRIP 线条
4. LINE_LOOP 闭合线条
5. TRIANGLES 单独三角形
6. TRIANGLE_STRIP 三角带
7. TRIANGLE_FAN 三角扇
8. LINE_LOOP闭合线条

###### 三角带规律
** 第偶数个 **
> 以上一个三角形的第二条边 + 下一个点为基础，以第二条边相反的方向绘制三角形
>
** 第奇数个 **
> 以上一个三角形的第三条边 + 下一个点为基础，以第二条边相反的方向绘制三角形
> 注：如果draw输入的点大于实际点的个数，默认会添加(0, 0)进行绘制

** 三角扇规律 **
> 以三角形的第三条边的反方向为起点