import File from "../models/File"


class FileController {
    async store(req, res) {
        const id = req.user
        const {originalname, filename} = req.file;

        const user = await File.update(id, originalname, filename)
        return res.redirect("/myprofile")
    }
}

export default new FileController();

