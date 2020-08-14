export const getData=()=>{
    return fetch('https://zn-task.herokuapp.com/api/company',{
        method:'GET',
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}
export const DeleteItem=(code)=>{
    return fetch(`https://zn-task.herokuapp.com/api/company/${code}`,{
        method:'DELETE',
     })
     .then(response=>response.json())
     .catch(error=>console.log(error))

}

export const update=(code,Employee)=>{
    return fetch(`https://zn-task.herokuapp.com/api/company/${code}`,{
        method:'PUT',
        headers:{
         Accept:'application/json',
         'Content-Type':'application/json',
     },
     body: Employee
     })
     .then(response=>response.json())
     .catch(error=> error)

}
