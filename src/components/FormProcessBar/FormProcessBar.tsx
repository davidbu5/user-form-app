import "./FormProcessBar.less";
import React from 'react';
import { observer } from 'mobx-react';
import { ObservableFormSection } from '../../common/stores/FormStore';
import { ObservedLanguageStore } from '../../common/stores/LanguageStore';

export interface IFormProcessBarProps { langStore: ObservedLanguageStore, sections: ObservableFormSection[], currSectionIndex: number }

@observer
export class FormProcessBar extends React.Component<IFormProcessBarProps> {

    getBadgeForSection(section: ObservableFormSection, index: number, isCurrentSection: boolean) {
        return <span className={isCurrentSection ? "current-section" : ""}>
            <span className="index">{index + 1} </span>
            <div>{this.props.langStore.getString(section.placeholderStringName)}</div>
        </span>;
    }

    render() {
        const badges = this.props.sections.map((section, index) =>
            <div className="section-badge" key={index}>
                {
                    this.getBadgeForSection(section, index, index === this.props.currSectionIndex)
                }
            </div>
        );

        return <div className="form-process-bar">{badges}</div>;
    }
}