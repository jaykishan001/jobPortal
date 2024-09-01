const roleCheck = async(req , res, next)=>{

    const user= req.user;
    console.log(user);
 
    if(user.role==="applicant"){
       return res.json("You are not recruiter")
    }
    else{
       next();
    }
 }

 export {roleCheck}