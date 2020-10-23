exports.create = (request) =>{
    let errors= [];

    if(request.full_name === ""){
        errors.push('نام نباید خالی باشد')
    }

    if(request.email === ""){
        errors.push('ایمیل نباید خالی باشد')
    }

    if(request.password === ""){
        errors.push('پسوورد نباید خالی باشد')
    }

    if(request.role === undefined){
        errors.push('نقش کاربری باید انتخاب گردد')
    }


    return errors
}