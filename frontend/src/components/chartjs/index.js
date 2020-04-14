import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

function Chartjs() {
    const [data, setData] = useState({
        chartData: {
            labels: ['teste', 'teste2'],
            datasets: [
                {
                    data: [70, 30],
                    backgroundColor: ['#7159ac', '#303030'],
                },
            ],
        },
    });

    console.log(data.chartData);
    return <Doughnut data={data.chartData} width={3} height={1} />;
}

export default Chartjs;
