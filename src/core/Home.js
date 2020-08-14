import React,{useState,useEffect} from 'react';
import { Table } from 'reactstrap';
import {getData,DeleteItem,update} from '../user/Userapi'
import { Button } from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { MDBDataTableV5 } from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import  Navbar from './Navbar'
import Container from '@material-ui/core/Container';

const Home=()=> {
    const [open,setOpen]=useState(false)
    const [view,setViewDetails]=useState([])
    const [color,setColor]=useState('')
    const [opneSnack,setopneSnack]=useState(false)
    const [message,setmessage]=useState('')
    const [openDialog,setopenDialog]=useState(false)
   
    const [name,setName] =useState('')
    const [code,setCOde] =useState('')


    

    const [column,setColumn]=useState(
        [
            {
                label: 'ID',
                field: '_id',
                sort: 'asc',
                width: 150
            },
            {
                label: 'name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
           {
               label: 'code',
               field: 'code',
               sort: 'asc',
               width: 250
           },
           
           {
               label: 'isActive',
               field: 'isActive',
               sort: 'asc',
               width: 150
           },
           {
               label: 'Actions',
               field: 'action',
               sort: 'asc',
               width: 150
           },
       ]
   )

   const [column2,setColumn2]=useState(
    [
        {
            label: 'ID',
            field: '_id',
            sort: 'asc',
            width: 150
        },
        {
            label: 'name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
       {
           label: 'code',
           field: 'code',
           sort: 'asc',
           width: 250
       },
       
       {
           label: 'isActive',
           field: 'isActive',
           sort: 'asc',
           width: 150
       },
       
      
   ]
)
    const [Entity,setEntity]=useState([])
    const [viewData,setViewData]=useState([])

       const viewItem = (viewData)=>{
           console.log(viewData)
           setViewData([viewData])
           setOpen(true)
       }
       const onDelete=(code)=>{
        DeleteItem(code).then(data=>{
            setopneSnack(true)
            setmessage(`Employe with code ${code} Deleted successfully`)
            setColor('#F24636')
            // 53AF500
        })
       }
    const data3={
        columns:column,
        rows: Entity.map((i,index)=>{
            return ({
                ...i  ,
                action: <> 
                <Button color="info" onClick={()=>viewItem(i)} style={{marginRight:'2px'}}><i class="far fa-eye"></i></Button>
                <Button color="success" onCanPlayCapturelick={()=>opneDialog(i.name,i.code)} style={{marginRight:'2px'}}><i class="far fa-edit"></i></Button>
                <Button color="danger" onClick={()=>onDelete(i.code)}> <i class="fas fa-trash"></i></Button>
                </>
                
            })
        })
    }
    const data2={
        columns:column2,
        rows: viewData
    }
   const opneDialog=(name,code)=>{
       setName(name)
       setCOde(code)
       setopenDialog(true)
   }
    useEffect(()=>{
        DataResult()
        
    },[opneSnack])
    const DataResult=()=>{
        getData().then(data=>{
            setEntity(data.result)
        }).catch(error=>{
            console.log(error)
        })
    }
    const handleChange=(e)=>{
        setName(e.target.value)
    }
  const clickSunmit=(e)=>{
      e.preventDefault()
      update(code,{name}).then(data=>{
          if(data == 'SyntaxError: Unexpected token < in JSON at position 0'){
            console.log(data)
        setopenDialog(false)
        setmessage(`there is an error please try again`)
        setopneSnack(true)
        setColor('red')
          } else{
              console.log(data)
            setopenDialog(false)
            setmessage(`Employe  ${name} Updated successfully`)
          setopneSnack(true)
          setColor('#53AF50')
          }
         
       
    }).catch(error =>{
        console.log(error)
        
    })


    }
   const handleClose=()=>{
        setopneSnack(false)
    }

    return(
                <div>
                <Navbar />
                <Container maxWidth="lg">

                <MDBDataTableV5 className='dataTable'
                                style={{textAlign:'center',marginTop:'15px'}}
                                    responsive
                                    striped
                                    bordered
                                    hover
                                    maxHeight="60vh"
                                    data={data3}
                                    responsiveSm
                                    responsiveMd
                                    responsiveLg
                                    responsiveXl
                                    sortable
                                />
                                 </Container>
                 <Snackbar
                        anchorOrigin={{vertical:"top",horizontal:"right"}} 
                        ContentProps={{style:{
                            backgroundColor:`${color}`
                             }}} 
                        open={opneSnack}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={message}
                   />

                <Dialog onClose={()=>setOpen(false)}  fullWidth maxWidth='md' aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle align='center' style={{backgroundColor:"#E5412D",color:'white',fontSize:'4rem'}} id="customized-dialog-title" onClose={()=>setOpen(false)}>
                        
                        <IconButton aria-label="close"  onClick={()=>setOpen(false)} style={{float:'right'}}>
                             <CloseIcon />
                         </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                    <MDBDataTableV5 className='dataTable'
                                style={{textAlign:'center'}}
                                    responsive
                                    striped
                                    bordered
                                    hover
                                    maxHeight="60vh"
                                    data={data2}
                                    responsiveSm
                                    responsiveMd
                                    responsiveLg
                                    responsiveXl
                                    sortable
                                />
                    </DialogContent>
                    
          </Dialog>



          <Dialog onClose={()=>setopenDialog(false)}  fullWidth maxWidth='md' aria-labelledby="customized-dialog-title" open={openDialog}>
                    <DialogTitle align='center' style={{backgroundColor:"#E5412D",color:'white',fontSize:'4rem'}} id="customized-dialog-title" onClose={()=>setopenDialog(false)}>
                        Update Employee
                        <IconButton aria-label="close"  onClick={()=>setopenDialog(false)} style={{float:'right'}}>
                             <CloseIcon />
                         </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                    <form className="mb-5" onSubmit={clickSunmit}>
            {/* <h2>Post a photo</h2> */}
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input  type="text" onChange={(e)=>handleChange(e) } className="form-control" value={name}  required/>

            </div>
            <div className="form-group">
                <label className="text-muted">code</label>
                <input  type="text"   className="form-control"  value={code} disabled/>

            </div>
      
           

            <button className="btn btn-outline-primary">Update Employee</button>
        </form>


                    </DialogContent>
                    
          </Dialog>
       
                   
                </div>
               

           


    )
   
}
export default Home;