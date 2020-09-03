/*var arr = [1,2,3,4]
arr.fill(5,2)
console.log(arr)
console.log('123abc'-'123')*/
/*const promise = new Promise((resolve,reject)=>{
    console.log(1)
    console.log(2)
});
promise.then(()=>{
    console.log(3)
})
console.log(4)

var obj = {
    age: 18,
    foo: function(func){
        func()
        arguments[0]()
    }
}
var age = 10
function temp(){
    console.log(this.age)
}
obj.foo(temp)
const a = 2021<0||typeof(2021+'pdd')
const b = 2021<0||typeof(2021-'pdd')
console.log(a,b)*/


var numIslands = function(grid) {
    var num=0;
    var a=grid.length;
    if(a==0) return 0;
    var b=grid[0].length;
    // 类似消消乐，一次坍塌相邻的一大片的效果！
    function over(i,j){
        if(i<0||j<0||i>=a||j>=b) return;
        if(grid[i][j]==1){
            grid[i][j]='0'
            over(i-1,j)
            over(i+1,j)
            over(i,j-1)
            over(i,j+1)
        }
        return;
    }
    // 遍历沉没所有相邻的为1的岛屿
    for(var i=0;i<a;i++){
        for(var j=0;j<b;j++){
            if(grid[i][j]==1){
                num++;
                over(i,j)
            }
        }
    }
    return num;
};
    
    let a = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
    console.log(numIslands(a))
    