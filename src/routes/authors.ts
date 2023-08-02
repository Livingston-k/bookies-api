import express from "express"
import { AuthorController } from "../controllers/AuthorController";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import { FileUploader } from "../middlewares/FileUploader";
const authorsController = new AuthorController()

const router = express.Router();
router.get('/', ErrorHandler.catchErrors(authorsController.getAuthors));
router.get('/:id', ErrorHandler.catchErrors(authorsController.getAuthor));
router.post('/',FileUploader.upload("image","authors",2*1024*1024),ErrorHandler.catchErrors(authorsController.create));
router.put('/:id', ErrorHandler.catchErrors(authorsController.update));
router.delete('/:id', ErrorHandler.catchErrors(authorsController.delete));

export default router