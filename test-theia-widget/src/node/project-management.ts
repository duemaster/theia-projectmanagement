import { injectable } from 'inversify';
import { ProjectClientInterface, ProjectServerInterface } from '../common/test-theia-protocol';

@injectable()
export class ProjectManagementImpl implements ProjectServerInterface {

    dispose(): void {
        //throw new Error("Method not implemented.");
        //Do nothing
    }

    setClient(client: ProjectClientInterface) {
        //Do nothing
    }

    async getProjectInfo() {
        return "Project Info";
    }

    async updateProjectInfo() {
        return "Update Project Info";
    }


}