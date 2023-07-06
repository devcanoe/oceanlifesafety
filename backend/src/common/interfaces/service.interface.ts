export default interface IService<Request, Response> {
    execute(req: Request, res: Response): Promise<void>;
}