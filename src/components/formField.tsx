import React, { SyntheticEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { ObservableFormField } from '../common/stores/FormStore';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';
import { FormFieldType } from '../common/stores/FormStore'

export interface FormFieldProps { field: ObservableFormField, langStore: ObservedLanguageStore }

@observer
export class FormField extends React.Component<FormFieldProps> {

    getFieldPlaceholder() {
        return this.props.langStore.getString(this.props.field.placeholderStringName);
    }

    onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === "checkbox") {
            this.props.field.value = event.target.checked;
        }
        else {
            this.props.field.value = event.target.value;
        }
    }

    getInput() {
        switch (this.props.field.fieldType) {
            case (FormFieldType.Text): {
                return this.getTextInput();
            }
            case (FormFieldType.Phone): {
                return this.getPhoneInput();
            }
            case (FormFieldType.Email): {
                return this.getEmailInput();
            }
            case (FormFieldType.Checkbox): {
                return this.getCheckboxInput();
            }
            case (FormFieldType.List): {
                return this.getListInput();
            }
        }
        return this.getTextInput();
    }

    getTextInput() {
        return (<>
            <input id={this.props.field.name} type="text"
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange}
                value={this.props.field.value as string} />
        </>);
    }

    getPhoneInput() {
        return (<>
            <input id={this.props.field.name} type="tel"
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange}
                value={this.props.field.value as string} />
        </>);
    }

    getEmailInput() {
        return (<>
            <input id={this.props.field.name} type="email"
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange}
                value={this.props.field.value as string} />
        </>);
    }

    getCheckboxInput() {
        return (<>
            <label htmlFor={this.props.field.name}>{this.getFieldPlaceholder()}</label>
            <input id={this.props.field.name} type="checkbox"
                onChange={this.onInputChange} checked={this.props.field.value as boolean} />
        </>);
    }

    getListInput() {
        return (<>
            <input id={this.props.field.name} list={this.props.field.name + "_list"}
                onChange={this.onInputChange} value={this.props.field.value as string} />

            <datalist id={this.props.field.name + "_list"}>
                {(this.props.field.valuesList as string[]).map(value => <option value={value} key={value} />)}
            </datalist>
        </>);
    }

    render() {
        return (<h3>{this.getInput()}</h3>);
    }
}