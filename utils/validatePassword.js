import catchAsync from "./catch.js"

async function validate(passord){
    const result = [];
    let rsUppercase = false
    let rslowercase = false
    let rsNum = false
    let rsSc = false;
    for(let c in passord){
        rsUppercase = passord[c].match(/^[A-Z]$/);
        if(rsUppercase) break;
    }

    if(!rsUppercase){
        result.push('Password must have at least a capital letter.')
    }

    for(let c in passord){
         rslowercase = passord[c].match(/^[a-z]$/);
         if(rslowercase) break;
    }

    if(!rslowercase){
        result.push('Password must have at least a small letter.')
    }

    for(let c in passord){
        rsNum = passord[c].match(/^[0-9]$/);
         if(rsNum) break;
    }

    if(!rsNum){
        result.push('Password must have at least a digit.')
    }

    for(let c in passord){
      rsSc = passord[c].match(/(^[&%#_^?><+=@!-$]$)/);
      if(rsSc) break;
    }

    if(!rsSc){
        result.push('Password must have at least a special character.')
    }

    return result.length > 0 ? "Password must have a digit, special character, capital and small letters." : 'true'
}

export default validate;