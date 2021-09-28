const employeeRouter = require('express').Router();
const Employee = require('../controller/employee.business_logic')

//rest api's
employeeRouter.get('/',(req,res)=>{
    res.send("WELCOME TO EMPLOYMENT PORTAL")
});

employeeRouter.post('/create',Employee.create);

employeeRouter.get('/read',Employee.read);

employeeRouter.put('/update/:_id',Employee.update);

employeeRouter.delete('/delete/:_id',Employee.delete);

module.exports=employeeRouter;