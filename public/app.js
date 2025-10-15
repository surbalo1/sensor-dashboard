const socket = io();

const sensorsContainer = document.getElementById('sensors');
const chartsContainer = document.getElementById('chartsContainer');
const resetBtn = document.getElementById('resetBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const statsDiv = document.getElementById('stats');
const toast = document.getElementById('toast');

const sensorConfig = [
    { key:'temp', label:'Temperature (°C)', yellow:25, red:28 },
    { key:'humidity', label:'Humidity (%)', yellow:60, red:70 },
    { key:'pressure', label:'Pressure (hPa)', yellow:1010, red:1015 }
];

const history = {};
const charts = {};

sensorConfig.forEach(s => {
    history[s.key] = [];

    const card = document.createElement('div');
    card.className = 'card';
    card.id = `${s.key}Card`;
    sensorsContainer.appendChild(card);

    const canvas = document.createElement('canvas');
    canvas.id = `${s.key}Chart`;
    chartsContainer.appendChild(canvas);

    charts[s.key] = new Chart(canvas.getContext('2d'), {
        type:'line',
        data:{ labels:[], datasets:[{ label:s.label, data:[], borderColor:'green', fill:false, tension:0.3 }] },
        options:{ responsive:true }
    });
});

function showToast(message){
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(()=>toast.style.display='none',2000);
}

function getCardColor(s,val){
    if(val>=s.red) { showToast(`${s.label} is CRITICAL!`); return 'red'; }
    if(val>=s.yellow) return 'yellow';
    return '';
}

socket.on('sensor-data', data=>{
    let statsText = '';
    sensorConfig.forEach(s=>{
        const val = parseFloat(data[s.key]);
        history[s.key].push(val);
        if(history[s.key].length>20) history[s.key].shift();

        // update card
        const card = document.getElementById(`${s.key}Card`);
        card.textContent = `${s.label}: ${val}`;
        card.className = `card ${getCardColor(s,val)}`;

        // update chart
        const chart = charts[s.key];
        chart.data.labels = history[s.key].map((_,i)=>i+1);
        chart.data.datasets[0].data = history[s.key];
        chart.update();

        // stats
        const max = Math.max(...history[s.key]).toFixed(2);
        const min = Math.min(...history[s.key]).toFixed(2);
        const avg = (history[s.key].reduce((a,b)=>a+b,0)/history[s.key].length).toFixed(2);
        statsText += `${s.label} -> Max: ${max}, Min: ${min}, Avg: ${avg} | `;
    });
    statsDiv.textContent = statsText;
});

// reset charts
resetBtn.addEventListener('click', ()=>{
    sensorConfig.forEach(s=>history[s.key]=[]);
    Object.values(charts).forEach(c=>{ c.data.labels=[]; c.data.datasets[0].data=[]; c.update(); });
});

// toggle theme
toggleThemeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    Object.values(charts).forEach(c=>{ c.canvas.classList.toggle('dark'); c.update(); });
});
