import express from "express"
import { AuthorController } from "../controllers/AuthorController";
import { ErrorHandler } from "../utils/ErrorHandler";
import { FileUploader } from "../middlewares/FileUploader";
const authorsController = new AuthorController()

const router = express.Router();
router.get('/', ErrorHandler.handleErrors(authorsController.getAuthors))
router.get('/:id',ErrorHandler.handleErrors(authorsController.getAuthor))
router.post('/',FileUploader.upload("image","authors",2*1024*1024), ErrorHandler.handleErrors(authorsController.create))

export default router