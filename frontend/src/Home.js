import React from 'react';
import Chart from './Chart.js';
import "./Home.css";
import NavBar from './NavBar.js';


const Home = () => {
    return (
        <div className="home">
            <div>
                <NavBar></NavBar>
            </div>
            <div>
                <Chart/>
            </div>
        </div>

    );
};

export default Home;