import { ContainerModule } from 'inversify';
import { TestTheiaWidgetWidget } from './test-theia-widget-widget';
import { TestTheiaWidgetContribution } from './test-theia-widget-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging';

import '../../src/browser/style/index.css';
import { ProjectServerSymbol, ProjectServerInterface, ProjectManagementPath } from '../common/test-theia-protocol';

export default new ContainerModule(bind => {
    bindViewContribution(bind, TestTheiaWidgetContribution);
    bind(FrontendApplicationContribution).toService(TestTheiaWidgetContribution);
    bind(TestTheiaWidgetWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: TestTheiaWidgetWidget.ID,
        createWidget: () => ctx.container.get<TestTheiaWidgetWidget>(TestTheiaWidgetWidget)
    })).inSingletonScope();

    bind(ProjectServerSymbol).toDynamicValue(ctx => {
        return WebSocketConnectionProvider.createProxy<ProjectServerInterface>(ctx.container, ProjectManagementPath);
    }).inSingletonScope();
});
