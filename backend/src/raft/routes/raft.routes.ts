import { Router } from "express";
import { container } from 'tsyringe';
import RaftController from "../controller/raft.controller";
import userAuth from "../../common/middleware/authorization.middleware";

const raftRouter = Router();
const raftController = container.resolve(RaftController);

raftRouter.post('/create', userAuth, (req, res)=>raftController.createRaft(req, res));
raftRouter.delete('/:id', userAuth, (req, res)=>raftController.deleteRaft(req, res));
raftRouter.get('/:id', userAuth, (req, res)=>raftController.getRafts(req, res));
raftRouter.get('/view/:id', userAuth, (req, res)=>raftController.getRaft(req, res));
raftRouter.patch('/:id', userAuth, (req, res)=>raftController.updateRaft(req, res));

export default raftRouter;