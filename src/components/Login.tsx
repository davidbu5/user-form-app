import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { Button } from './Button';
import { ObservedLanguageStore } from '../common/stores/LanguageStore';

interface ILoginProps { langStore: ObservedLanguageStore, onSubmit: (userName: string, password: string) => void }
interface ILoginState { userName: string; password: string }

@observer
export class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);

        this.state = { userName: "", password: "" };
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.userName, this.state.password)
    }

    onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ userName: event.target.value });
    }

    onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }

    getPlaceholder = (stringName: "password" | "userName") => {
        return this.props.langStore.getString(stringName);
    }

    isSubmitDisabled = () => {
        return (!this.state.userName || !this.state.password);
    }

    render() {
        return <div>
            <input type="text" placeholder={this.getPlaceholder("userName")} onChange={this.onUserNameChange} />
            <input type="password" placeholder={this.getPlaceholder("password")} onChange={this.onPasswordChange} />
            <Button text={this.props.langStore.getString("submit")}
                onButtonClick={this.onSubmit} isDisabled={this.isSubmitDisabled()}></Button>
        </div>;
    }
}