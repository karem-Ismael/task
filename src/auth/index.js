export const isAuthenticated=()=>{
    if(localStorage.getItem('token')){
        return localStorage.getItem('token')
    }else{
        return false
    }
}
export const logOut=()=>{
    localStorage.removeItem('token')
    
}