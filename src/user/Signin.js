import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {signin, authenticated,isAuthenticated} from '../auth'
import { Container, Row, Col } from 'reactstrap';
import jwt from 'jsonwebtoken'

const Signin=()=>{
    const [values,setValues]=useState({
        email:'',
        password:'',
        error: '',
        loading:false,
        redirecTO:false
        
    })
    const {email,password,error,loading,redirecTO}=values
    const {user}=isAuthenticated()
    const handleChange=(e)=>{
            setValues({...values,error:false ,[e.target.name]:e.target.value})
    }
   
    const clickSubmit=(e)=>{
        e.preventDefault()
        setValues({...values,loading:true})
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        console.log(token)
        localStorage.setItem('token',token)
        redirectUser()
      


    }
    const showError =()=>(
        <div className="alert alert-danger" style={{display: error ?'':'none'}}>
            {error}
         </div>

        )
       
    const showLoading=()=>(
        loading && (<div className="alert alert-info">loading ...</div>) 

    )
    const redirectUser=()=>{
        if(isAuthenticated() ){
                return <Redirect to='/'/>
                
        }
    }
    
    const singInForm=()=>(

        <Container>
        <Row>
        <Col >
        <form style={{border:'1px solid #EEE',padding:'33px',margin:'100px'}} onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted" >Email</label>
                    <input type="email" onChange={handleChange} name="email" value={email}className="form-control" required/>
                </div>
                <div className="form-group">
                    <label className="text-muted" >Password</label>
                    <input type="password" onChange={handleChange}  name="password" value={password} className="form-control" required/>
                </div>
                <button type="submit" className="btn btn-primary" >Signup</button>
            </form> 
        </Col>
        </Row>


            
        </Container>

    )
    return (
       <>
                  {showLoading()}
                {singInForm()}
                {/* {JSON.stringify(values)} */}
                {showError()}
                {redirectUser()}
                </>
       

    )
}
   
export default Signin;