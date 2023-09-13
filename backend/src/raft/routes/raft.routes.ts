import { Router } from "express";
import { container } from 'tsyringe';
import RaftController from "../controller/raft.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const raftRouter = Router();
const raftController = container.resolve(RaftController);

raftRouter.post('/create', userAuth, (req, res, next)=>raftController.createRaft(req, res, next));
raftRouter.delete('/:id', userAuth, (req, res, next)=>raftController.deleteRaft(req, res, next));
raftRouter.get('/:id', userAuth, (req, res, next)=>raftController.getRafts(req, res, next));
raftRouter.get('/view/:id', userAuth, (req, res, next)=>raftController.getRaft(req, res, next));
raftRouter.patch('/:id', userAuth, (req, res, next)=>raftController.updateRaft(req, res, next));

export default raftRouter;