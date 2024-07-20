import FileModel from "../model/file.js";
import { sendMail } from "../services/emailService.js";

import { emailTemplate } from "../services/emailTemplate.js";

const sendEmail = async (req,res)=>{
    const {uuid , emailTo , emailFrom} = req.body;
    if(!uuid || !emailTo || !emailFrom){
        return  res.status(422).json({
            message : "All field are required"
        })
    }
    // get data from db
    const file = await FileModel.findOne({
        uuid : uuid
    })

    if(file.sender){
        return res.status(422).json({
            message : "Email Already Send"
        })
    }

    file.sender = emailFrom;
    file.sender = emailTo;

    const response = await file.save();
    sendMail({
        from : emailFrom,
        to : emailTo,
        subject : "File Sharing",
        text : `${emailFrom} shared a file with you`,
        html : emailTemplate({
            emailFrom : emailFrom,
            downloadLink : `http://localhost:3000/files/${file.uuid}`,
            size : parseInt(file.size/1000) + " KB",
            expires : "24 hours"
        })
    })

    return res.send({success : true})
}

export {
    sendEmail
}