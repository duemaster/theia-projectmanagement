import * as React from 'react';
import axios from 'axios';
import { MessageService } from '@theia/core';
import { inject } from 'inversify';

export class ProjectManagementForm extends React.Component<{}, { projectName: string, projectDescription: string, projectStatus: boolean }> {

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    constructor(props: any) {
        super(props);

        this.state = {
            projectName: 'ProjectName',
            projectDescription: 'Testing Description',
            projectStatus: true
        };
    }

    render(): JSX.Element {
        return (
            <div className="widget-container">
                <label>
                    Project Name:
                    <input value={this.state.projectName} />
                </label>

                <label>
                    Project Description:
                    <input value={this.state.projectName} />
                </label>

                <input type="checkbox" name="Project Public Status" checked={this.state.projectStatus} />

                <button title='Update Project' onClick={_a => this.sendProjectUpdateRequest()}>Update Project</button>

            </div>
        )
    }

    protected sendProjectUpdateRequest() {
        axios.post(`http://localhost:2000/api/proj/signup`, {
            projectName: 'test'
        }).then(
            response => {
                this.messageService.info('Send Request');
            }
        )
    }
}