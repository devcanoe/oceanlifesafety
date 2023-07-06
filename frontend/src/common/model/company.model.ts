import Base from "./base.model";

export default interface Company extends Base {
    name?: string;
    address?: string;
}