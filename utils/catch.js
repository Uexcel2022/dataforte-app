function catchAsync(fn){
 return (req,resp,next)=>{
   fn(req,resp,next).catch(next);
 }
}

export default catchAsync;