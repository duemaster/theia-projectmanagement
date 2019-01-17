import { JsonRpcServer } from "@theia/core";

export const ProjectManagementPath = "/services/project";

export const ProjectServerSymbol = Symbol('ProjectServer');
export const ProjectClientSymbol = Symbol('ProjectClient');

export interface ProjectServerInterface extends JsonRpcServer<ProjectClientInterface> {

    getProjectInfo(containerId: string): Promise<any>;

    updateProjectInfo(containerId: string): Promise<any>;
}

export interface ProjectClientInterface {
    //Does nothing
}