import { Project } from "../models/project.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";
export const handleGetProjects = HandlerCustom(async () => {
    const projects = await Project
        .find()
        .exec();
    return projects;
});
export const handleGetProjectById = HandlerCustom(async (data) => {
    const projects = await Project
        .findById({ _id: data.id })
        .exec();
    return projects;
});
