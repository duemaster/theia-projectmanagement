import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

@injectable()
export class TestTheiaWidgetWidget extends ReactWidget {

    static readonly ID = 'test-theia-widget:widget';
    static readonly LABEL = 'TestTheiaWidget Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TestTheiaWidgetWidget.ID;
        this.title.label = TestTheiaWidgetWidget.LABEL;
        this.title.caption = TestTheiaWidgetWidget.LABEL;
        this.title.closable = true;
        this.update();
    }

    protected render(): React.ReactNode {
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;


        return (<div id='widget-container'>
            <h2>{TestTheiaWidgetWidget.LABEL}</h2>
            <label>
                Name:
          <input type="text" name="name" />
            </label>
            <AlertMessage type='INFO' header={header} />
            <button className='secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
        </div>
        )

        // return (
        //     <div id='widget-container'>
        //         <form>
        //             <label>
        //                 Name:
        //   <input type="text" name="name" />
        //             </label>
        //             <input type="submit" value="Submit" />
        //         </form>
        //     </div>
        // )
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: TestTheiaWidget Widget Successfully Created!');
    }

}
