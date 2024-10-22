const jwt = require('jsonwebtoken');
const secretKey = 'Shubhi%$123$efs';

const setUserJwt = (student) => {
    return jwt.sign({
        id: student.id,
        email: student.email,
        role: student.role,
    }, secretKey);
}

const getUserJwt = (token) => { 
   if(!token) return null;
   try{
    return jwt.verify(token, secretKey);
   }
   catch(error){
    return null;
   }
}

module.exports = {
    setUserJwt, getUserJwt
}