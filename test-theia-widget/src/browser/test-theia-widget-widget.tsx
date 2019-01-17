import * as React from 'react';
import { injectable, postConstruct } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { ProjectManagementForm } from './form-view';

@injectable()
export class TestTheiaWidgetWidget extends ReactWidget {

    static readonly ID = 'test-theia-widget:widget';
    static readonly LABEL = 'TestTheiaWidget Widget';

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TestTheiaWidgetWidget.ID;
        this.title.label = TestTheiaWidgetWidget.LABEL;
        this.title.caption = TestTheiaWidgetWidget.LABEL;
        this.title.closable = true;
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <ProjectManagementForm></ProjectManagementForm>
        )
    }
}
