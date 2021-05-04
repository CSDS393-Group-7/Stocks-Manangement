import React from 'react';
import { Result } from 'antd';

export default function Page403() {
    return (
    <Result
        className="app-result-page"
        status="403"
        title="403"
        subTitle="You must log in first"
    />
    )
}
