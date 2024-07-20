import FileModel from "../model/file.js"
const showFile = async (req,res)=>{
    try {
        const file = await FileModel.findOne({
            uuid : req.params.uuid
        })
        if(!file){
            return res.render('download',{
                error : "Link has been expired"
            });
        }

        return res.render('download',{
            uuid : file.uuid,
            fileName : file.filename,
            fileSize : file.size,
            downloadLink : `http://localhost:3000/files/download/${file.uuid}`
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