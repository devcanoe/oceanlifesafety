"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Crud {
    constructor(service) {
        this.service = service;
        this.service = new service();
    }
    create(payload) {
        this.service.create(payload);
    }
    getAll() {
        this.service.getAll();
    }
    getOne(id) {
        this.service.getOne(id);
    }
    delete(id) {
        this.service.delete(id);
    }
    update(id, payload) {
        this.service.update(id, payload);
    }
}
exports.default = Crud;
