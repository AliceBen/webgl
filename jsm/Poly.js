const defAttr = () => ({
  gl: null, // webgl 上下文对象
  // 顶点数据集合,在被赋值的时候会做两件事
  // 1.更新count顶点数量，数量运算尽量不放到渲染方法里
  // 2.向缓冲区写入顶点数据
  vertices: [], 
  geoData: [], // 模型数据，对象数组，可解析出vertices顶点数据
  size: 2,  // 顶点分量的数目
  attrName: 'a_Position', // 顶点位置的变量名
  count: 0, // 顶点数量
  types: ['POINTS'],  // 绘图方式
})

export default class Poly {
  constructor(attr) {
    Object.assign(this, defAttr(), attr)
    this.init()
  }
  // 初始化方法，建立缓冲对象，并绑定到webgl上下文对象上，然后向其中写入顶底数据
  init () {
    const { attrName, size, gl } = this
    if(!gl) { return }
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    this.updateBuffer()
    const a_Position = gl.getAttribLocation(gl.program, attrName)
    gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
  }
  // 添加顶点
  addVertice (...params) {
    this.vertices.push(...params)
    this.updateBuffer()
  }
  // 删除最后一个顶点
  popVertice () {
    const { vertices, size } = this
    const len = vertices.length
    vertices.splice(len - size, len)
    this.updateCount()
  }
  // 根据索引位置设置顶点
  setVertice(ind, ...params) {
    const { vertices, size } = this
    const i = ind * size
    params.forEach((param, paramInd) => {
      vertices[i + paramInd] = param
    })
  }
  // 更新缓冲区数据，同时更新顶点数据
  updateBuffer () {
    const { gl, vertices } = this
    this.updateCount()
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  }
  // 更新顶点数量
  updateCount () {
    this.count = this.vertices.length / this.size
  }
  // 基于geoData解析出vetices数据
  updateVertices (params) {
    const { geoData } = this
    const vertices = []
    geoData.forEach(data => {
      params.forEach(key => {
        vertices.push(data[key])
      })
    })
    this.vertices = vertices
  }
  // 绘图方法
  draw(types = this.types) {
    const { gl, count } = this
    for (let type of types) {
      gl.drawArrays(gl[type], 0, count)
    }
  }
}