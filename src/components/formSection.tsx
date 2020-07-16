import React from 'react';
import { observer } from 'mobx-react';
import { ObservableFormSection } from '../common/stores/FormStore';
import { FormField } from './FormField';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

export interface FormSectionProps { section: ObservableFormSection, langStore: ObservedLanguageStore }

@observer
export class FormSection extends React.Component<FormSectionProps> {
    render() {
        return <div>
            <h1>{this.props.langStore.getString(this.props.section.placeholderStringName)}</h1>
            {this.props.section.fields.map(field => <FormField field={field} langStore={this.props.langStore} key={field.name} />)}
        </div>;
    }
}