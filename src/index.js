import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Table from './components/table/table';

const App = () => <Table />;

console.log('Chekcing dev mode', process.env.NODE_ENV);

ReactDOM.render(<App />, document.getElementById('root'));
