import React from 'react';

export interface ButtonProps {
    text: string;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return <button onClick={this.props.onButtonClick}>{this.props.text}</button>;
    }
}