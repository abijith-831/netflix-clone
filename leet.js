let n = 521
let sum = 0
n = n.toString()

for(let i=0;i<n.length;i++){
    if(i%2===0){
        sum += Number(n[i])
        
    }
    if(i%2===1){
        sum -= Number(n[i])
        
    }
}
