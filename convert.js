let add = (a,b) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
        if(typeof a != 'number' || typeof b != 'number'){
            reject(new Error('Khong phai la number'));
        }else{
           resolve(a+b); 
        }
    },2000)
    })
}
add(3,4)
.then(res => console.log(res))
.catch(e => console.log(e +''));

let mutil = (a,b) =>{
    
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
        if(typeof a != 'number' || typeof b != 'number'){
            reject(new Error('Khong phai la number'));
        }else{
           resolve(a*b);   
         }
        },1000)
    })
}
mutil(3,4)
.then(res => console.log(res))
.catch(e => console.log(e +''));

let tru = (a,b) =>{
    
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
        if(typeof a != 'number' || typeof b != 'number'){
            reject(new Error('Khong phai la number'));
        }else{
           resolve(a-b);
           
        }
        },1000)
    })
}
let S = async (a,b) =>{
    try {
        let a1 = await add(a,b);
        let a2 = await mutil(a,b);
        let h = await tru(a1,a2);
        // return Promise.resolve(h);
        console.log(h);
    } catch (error) {
        // return Promise.reject('Loi');
        console.log('Loi')
    }
}
S(3,'4')
// .then(res =>{console.log(res)})
// .catch(error =>{console.log('Loi')})