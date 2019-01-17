import { ContainerModule } from 'inversify';
import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core/lib/common/messaging';

import { ProjectManagementImpl } from './project-management';
import { ProjectServerInterface, ProjectClientInterface, ProjectManagementPath, ProjectServerSymbol } from '../common/test-theia-protocol'

export default new ContainerModule(bind => {
    bind(ProjectServerSymbol).to(ProjectManagementImpl).inSingletonScope();
    
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<ProjectClientInterface>(ProjectManagementPath, client => {
            const projectServer = ctx.container.get<ProjectServerInterface>(ProjectServerSymbol);
            projectServer.setClient(client);
            // when connection closes, cleanup that client of task-server
            // client.onDidCloseConnection(() => {
            //     projectServer.disconnectClient(client);
            // });
            return projectServer;
        })
    ).inSingletonScope();
});
