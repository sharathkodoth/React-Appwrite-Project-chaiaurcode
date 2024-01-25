import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                status,
                featuredImage,
                userId,
            })
        } catch (error) {
            console.log("Appwrite Service ", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteUrl, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            })
        } catch (error) {
            console.log("Appwrite ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteUrl, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite Service ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return this.databases.getDocument(conf.appwriteUrl, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite Service", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return this.databases.listDocuments(conf.appwriteUrl, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite Service", error)
            return false
        }
    }
    

    //File Upload
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite Upload Failed: ", error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } catch (error) {
            console.log("Appwrite Service: ", error)
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite Preview Service: ",error)
        }
    }


}

const service = new Service();
export default service;