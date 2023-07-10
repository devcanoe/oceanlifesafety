import { Router } from "express";
import { container } from 'tsyringe';
import RaftController from "../controller/raft.controller";

const raftRouter = Router();
const raftController = container.resolve(RaftController);

raftRouter.post('/create', (req, res)=>raftController.createRaft(req, res));
raftRouter.delete('/:id', (req, res)=>raftController.deleteRaft(req, res));
raftRouter.get('/', (req, res)=>raftController.getRafts(req, res));

export default raftRouter;