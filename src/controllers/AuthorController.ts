import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../database/entities/Author";
import { ResponseUtl } from '../utils/Response';
import { Paginator } from "../database/Paginator";
import { CreateAuthorDTO, UpdateAuthorDTO } from "../dtos/AuthorDTO";
import { validate } from "class-validator";

export class AuthorController {
    async getAuthors(req: Request, res: Response) {
        const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
        const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
        return ResponseUtl.sendResponse(res, "Authors fetched successfully", authors, paginationInfo)
    }

    async getAuthor(req: Request, res: Response) {
        const { id } = req.params;
        const author = await AppDataSource.getRepository(Author).findOneByOrFail({ id: Number(id) })
        return ResponseUtl.sendResponse<Author>(res, "Author fetched successfully", author)
    }

    async create(req: Request, res: Response): Promise<Response> {
        const AuthorData = req.body;
        AuthorData.image = req.file?.filename;
        const dto = new CreateAuthorDTO();
        Object.assign(dto, AuthorData);
        const errors = await validate(dto);
        if (errors.length > 0) { return ResponseUtl.sendError(res, "Invalid Data", 422, errors) }
        const repo = AppDataSource.getRepository(Author);
        const author = repo.create(AuthorData);
        await repo.save(author);
        return ResponseUtl.sendResponse(res, "Author created successfully", author);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const AuthorData = req.body;
        const dto = new UpdateAuthorDTO();
        Object.assign(dto, AuthorData);
        const errors = await validate(dto);
        if (errors.length > 0) { return ResponseUtl.sendError(res, "Invalid Data", 422, errors) }
        const repo = AppDataSource.getRepository(Author);
        const author = await repo.findOneByOrFail({ id: Number(id) })
        repo.merge(author, AuthorData);
        await repo.save(author);
        return ResponseUtl.sendResponse(res, "Author updated successfully", author);
    }


    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Author);
        const author = await repo.findOneByOrFail({ id: Number(id) })
        await repo.remove(author);
        return ResponseUtl.sendResponse(res, "Author deleted successfully", null);
    }
}