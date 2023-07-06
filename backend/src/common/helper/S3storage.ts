import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export default class S3 {

    region: string;
    apiVersion: string; 

    constructor(region: string, apiVersion: string){
        this.region = region
        this.apiVersion = apiVersion
    }

    upload(){
        //set region
        aws.config.update({region: this.region})

        //create s3 service object
        let s3 = new aws.S3({apiVersion: this.apiVersion});
    }
}