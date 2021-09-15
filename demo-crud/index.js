const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin21",
    database:"escuela"
});
/*-----------------------------------------/---------------------------------------*/
/*retorna los datos del estudiante*/
app.get('/',(req,res)=>{
    console.log('retornar datos de los estudiante')
    mysqlConnection.query('select e.id, p.nombre, e.carnet from escuela.estudiante e join escuela.persona p on e.id_persona=p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*---------------------------------------PERSONAS------------------------------------------*/
/*Get-Persona*/
app.get('/personas',(req,res)=>{
    console.log('get lista personas')
    mysqlConnection.query('Select * from persona',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Persona*/
app.get('/personas/:id',(req,res)=>{
    console.log('get persona')
    mysqlConnection.query('Select * from persona where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Persona*/
app.post('/personas',(req,res)=>{
    console.log('Insert personas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento, Direccion) values (?,?,?,?)',
    [emp.Nombre,emp.Apellido,emp.FechaNacimiento,emp.Direccion],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Persona*/
app.put('/personas/:id',(req,res)=>{
    console.log('Update personas')
    let emp=req.body;
    mysqlConnection.query('update persona set nombre=?, apellido=?, fecha_nacimiento=?, Direccion=? where id=?',
    [emp.Nombre,emp.Apellido,emp.FechaNacimiento,emp.Direccion,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Persona*/
app.delete('/personas/:id',(req,res)=>{
    console.log('Delete estudiante')
    mysqlConnection.query('delete from persona where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});
/*---------------------------------------Maestros----------------------------------------*/
/*Get-Maestros*/
app.get('/maestros',(req,res)=>{
    console.log('get lista maestros')
    mysqlConnection.query('select d.id, d.id_persona, d.fecha_ingreso, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion from escuela.docente d join escuela.persona p on d.id_persona=p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Maestros*/
app.get('/maestros/:id',(req,res)=>{
    console.log('get maestro')
    mysqlConnection.query('select d.id, d.id_persona, d.fecha_ingreso, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion from escuela.docente d join escuela.persona p on d.id_persona=p.id where d.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Maestros*/
app.post('/maestros',(req,res)=>{
    console.log('Insert maestros')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into docente (id_persona, fecha_ingreso) values (?,?)',
    [emp.IdPersona,emp.FechaIngreso],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Maestros*/
app.put('/maestros/:id',(req,res)=>{
    console.log('Update maestros')
    let emp=req.body;
    mysqlConnection.query('update docente set id_persona=?, fecha_ingreso=? where id=?',
    [emp.IdPersona,emp.FechaIngreso,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Maestros*/
app.delete('/maestros/:id',(req,res)=>{
    console.log('Delete maestro')
    mysqlConnection.query('delete from docente where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});
/*---------------------------------------Estudiantes----------------------------------------*/
/*Get-Estudiantes*/
app.get('/estudiantes',(req,res)=>{
    console.log('get lista estudiantes')
    mysqlConnection.query('select e.id, e.id_persona, e.fecha_ingreso, e.carnet, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion, e.status from escuela.estudiante e join escuela.persona p on e.id_persona=p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Estudiante*/
app.get('/estudiantes/:id',(req,res)=>{
    console.log('get estudiante')
    mysqlConnection.query('select e.id, e.id_persona, e.fecha_ingreso, e.carnet, p.nombre, p.apellido, p.fecha_nacimiento, p.Direccion, e.status from escuela.estudiante e join escuela.persona p on e.id_persona=p.id where e.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Estudiante*/
app.post('/estudiantes',(req,res)=>{
    console.log('Insert estudiantes')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into estudiante (id_persona, fecha_ingreso, carnet) values (?,?,?)',
    [emp.IdPersona,emp.FechaIngreso,emp.Carnet],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Estudiante*/
app.put('/estudiantes/:id',(req,res)=>{
    console.log('Update estudiantes')
    let emp=req.body;
    mysqlConnection.query('update estudiante set id_persona=?, fecha_ingreso=?, carnet=? where id=?',
    [emp.IdPersona,emp.FechaIngreso,emp.Carnet,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Estudiante*/
app.delete('/estudiantes/:id',(req,res)=>{
    console.log('Delete estudiante')
    mysqlConnection.query('delete from estudiante where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

app.listen(3000);