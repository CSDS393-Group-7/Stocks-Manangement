import React from 'react';
import { Result } from 'antd';

export default function AlreadyLoggedIn() {
    return (
    <Result
        className="app-result-page"
        status="500"
        title="You already logged in!"
    />
    )
}