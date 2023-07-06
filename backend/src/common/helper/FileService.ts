import { injectable } from "tsyringe";
import aws from 'aws-sdk';
import { Request } from "express";

@injectable()
export default class FileService {

    s3 = new aws.S3({
        credentials: {
            accessKeyId: process.env.ACCESSKEYID ? process.env.ACCESSKEYID : '',
            secretAccessKey: process.env.SECRETACCESSKEY ? process.env.SECRETACCESSKEY : ''
        }
    })

    constructor() {
        aws.config.update({ region: 'us-east-1' });
    }

    async uploadFile(req: Request) {
        const { files } = req.body;

        const fileName = files.file.name;
        const albumPhotosKey = encodeURIComponent(files.file.name) + "/";

        const photoKey = albumPhotosKey + fileName;

        const uploadParams = {
            Bucket: '',
            Key: photoKey,
            Body: files.file,
        }

        const uploadFile = new aws.S3.ManagedUpload({ params: uploadParams });

        return uploadFile.promise() ;
    }

    async viewFile(fileName: string) {
        const file = await this.s3.getObject({ Bucket: '', Key: fileName }).promise();
        
        return file.Body;
    }

    async deleteFile(req: Request) {

    }

    async fileList(req: Request) {
        
    }
}