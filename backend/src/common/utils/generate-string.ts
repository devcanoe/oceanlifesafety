import { v4 as uuidv4 } from 'uuid';

export const generateReference = (prefix: string) => {
    const generateref = uuidv4();
    return `${prefix}-${generateref}`
}