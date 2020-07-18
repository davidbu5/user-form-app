import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { ObservableFormField } from '../../common/stores/FormStore';
import { ObservedLanguageStore } from '../../common/stores/LanguageStore';
import { FormFieldType } from '../../common/stores/FormStore'

export interface IFormFieldProps { field: ObservableFormField, langStore: ObservedLanguageStore }
export interface IFormFieldState { touched: boolean }

@observer
export class FormField extends React.Component<IFormFieldProps, IFormFieldState> {

    constructor(props: IFormFieldProps) {
        super(props);

        this.state = { touched: false };
    }

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

    onFocus = () => {
        this.setState({ touched: true });
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
    }

    getTextInput() {
        return (<>
            <input id={this.props.field.name} type="text"
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange}
                value={this.props.field.value as string}
                onFocus={this.onFocus} />
        </>);
    }

    getPhoneInput() {
        return (<>
            <input id={this.props.field.name} type="tel"
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange}
                value={this.props.field.value as string}
                onFocus={this.onFocus} />
        </>);
    }

    getEmailInput() {
        return (<>
            <input id={this.props.field.name} type="email"
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange}
                value={this.props.field.value as string}
                onFocus={this.onFocus} />
        </>);
    }

    getCheckboxInput() {
        return (<>
            <input id={this.props.field.name} type="checkbox"
                onChange={this.onInputChange} checked={this.props.field.value as boolean}
                onFocus={this.onFocus} />
            <label htmlFor={this.props.field.name}>{this.getFieldPlaceholder()}</label>
        </>);
    }

    getListInput() {
        return (<>
            <input id={this.props.field.name} list={this.props.field.name + "_list"}
                placeholder={this.getFieldPlaceholder()} onChange={this.onInputChange} 
                value={this.props.field.value as string}
                onFocus={this.onFocus} />

            <datalist id={this.props.field.name + "_list"}>
                {(this.props.field.valuesList as string[]).map(value => <option value={value} key={value} />)}
            </datalist>
        </>);
    }

    render() {
        return (<div>
            {this.getInput()}
            {
                !this.props.field.isValid && this.state.touched ?
                    <div>{this.props.langStore.getString(this.props.field.validationErrorMessageStringName)}</div> :
                    ""
            }
        </div>);
    }
}