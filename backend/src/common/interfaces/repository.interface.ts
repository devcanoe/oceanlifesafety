export default interface IRepository {
    addData(data: any): Promise<any>;
    fetchData(data: any): Promise<any>;
    fetchOneData(data: any): Promise<any>;
    updateData(keyword: any, data: any): Promise<any>;
    deleteData(id: string): Promise<void>;
}