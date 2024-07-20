import FileModel from "../model/file.js"
const showFile = async (req,res)=>{
    try {
        const file = FileModel.findOne({
            uuid : req.params.uuid
        })
        if(!file){
            return res.render('download',{
                error : "Link has been expired"
            });
        }

        return res.render('download',{
            uuid : file.uuid,
            filename : file.filename,
            filesize : file.size,
            download : `http://localhost:3000/files/download/${file.uuid}`
        })
    } catch (error) {
        return res.render('download',{
            error : "Something Went wrong"
        });
    }
}

export {
    showFile
}