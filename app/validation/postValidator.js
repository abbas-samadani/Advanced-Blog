

exports.create = (request) =>{
    let errors= [];

    if(request.title === ""){
        errors.push('عنوان نباید خالی باشد')
    }

    if(request.slug === ""){
        errors.push('نامک نباید خالی باشد')
    }

    if(request.content === ""){
        errors.push('محتوا نباید خالی باشد')
    }

    return errors
}
