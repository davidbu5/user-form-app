import React from 'react';
import { observer } from 'mobx-react';
import { ObservableFormSection } from '../common/stores/FormStore';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

export interface IFormProcessBarProps { langStore: ObservedLanguageStore, sections: ObservableFormSection[], currSectionIndex: number }

@observer
export class FormProcessBar extends React.Component<IFormProcessBarProps> {

    getBadgeForSection(section: ObservableFormSection, index: number) {
        return <span>
            <span>{index + 1} </span>
            <span>{this.props.langStore.getString(section.placeholderStringName)}</span>
        </span>;
    }

    render() {
        return <div>{
            this.props.sections.map((section, index) =>
                <span key={index}>
                    {index === this.props.currSectionIndex ?
                        <b>{this.getBadgeForSection(section, index)}</b> :
                        this.getBadgeForSection(section, index)
                    }
                    {
                        index < this.props.sections.length - 1 ? <span> - </span> : ""
                    }
                </span>
            )
        }</div>;
    }
}