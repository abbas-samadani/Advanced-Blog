
const dataService = require('../../services/dataService')
const settingModel = require('../../models/settings')
//const settingValidator = require('../../validation/settingValidator')
//const sessionController = require('../../controllers/session/controller')


exports.index=async (req,res)=>{    
    const settings = await settingModel.findAll();    
    const presentedSettings = {}
    settings.forEach(key =>{
        presentedSettings[key.setting_name] = key.setting_value
    })
    
    res.adminRender('admin/settings/index' , {layout : 'admin' , presentedSettings , helpers: {
        isChecked : function(value,options){
            return parseInt(value) === 1 ? options.fn(this) : options.inverse(this)
        }
    }})
}

exports.store = async (req,res) =>{
    const settings = await req.body;
    const validatedSetting = {};
    
    
    if(! req.body.someone_can_register){
        validatedSetting.someone_can_register = 0;
    }
    if(! req.body.users_can_enter_comments){
        validatedSetting.users_can_enter_comments = 0;
    }

    Object.keys(settings).forEach(setting_name =>{        
        settings[setting_name] === 'on' ? validatedSetting[setting_name] = 1 : validatedSetting[setting_name] = settings[setting_name];                      
    })
    
    const result = await settingModel.update(validatedSetting)
    res.redirect('/admin/settings')
}

