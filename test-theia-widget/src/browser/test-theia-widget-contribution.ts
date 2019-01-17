import { injectable, inject } from 'inversify';
import { MenuModelRegistry } from '@theia/core';
import { TestTheiaWidgetWidget } from './test-theia-widget-widget';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { ProjectServerInterface, ProjectServerSymbol } from '../common/test-theia-protocol';

export const TestTheiaWidgetCommand: Command = { id: 'test-theia-widget:command' };

@injectable()
export class TestTheiaWidgetContribution extends AbstractViewContribution<TestTheiaWidgetWidget> {


    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     * 
     * We can pass `defaultWidgetOptions` which define widget properties such as 
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     * 
     */
    constructor(
        @inject(ProjectServerSymbol) private readonly projectServer: ProjectServerInterface
    ) {

        super({
            widgetId: TestTheiaWidgetWidget.ID,
            widgetName: TestTheiaWidgetWidget.LABEL,
            defaultWidgetOptions: { area: 'main' },
            toggleCommandId: TestTheiaWidgetCommand.id
        });
    }

    /**
     * Example command registration to open the widget from the menu, and quick-open.
     * For a simpler use case, it is possible to simply call:
     ```ts
        super.registerCommands(commands)
     ```
     *
     * For more flexibility, we can pass `OpenViewArguments` which define 
     * options on how to handle opening the widget:
     * 
     ```ts
        toggle?: boolean
        activate?: boolean;
        reveal?: boolean;
     ```
     *
     * @param commands
     */
    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(TestTheiaWidgetCommand, {
            execute: async () => {
                console.log(await this.projectServer.getProjectInfo(""));
                super.openView({ activate: false, reveal: true });
            }
        });
    }

    /**
     * Example menu registration to contribute a menu item used to open the widget.
     * Default location when extending the `AbstractViewContribution` is the `View` main-menu item.
     * 
     * We can however define new menu path locations in the following way:
     ```ts
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: 'id',
            label: 'label'
        });
     ```
     * 
     * @param menus
     */
    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }
}
