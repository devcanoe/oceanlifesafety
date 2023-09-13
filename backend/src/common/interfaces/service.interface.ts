export default interface IService<Request, Response, NextFunction> {
    execute(req: Request, res: Response, next: NextFunction): Promise<void>;
}