import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true , id: 1},
                {name: 'Max N.', salary: 2000, increase: true, rise: false, id: 2},
                {name: 'Yasha Z.', salary: 3200, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: ''
        };
        this.maxId = 4;
    }

    searchEmp = (items, term) => {
        // Перший аргумент це буде строка за якою шукаємо, а другий, масив даних в якому це буде фільтруватись
        // Потрібно передбачити деякі ситуації бо це важливо
        if (term.length === 0) {
            return items; // на випадок якщо строка була заповнена а потім видалена
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    // onToggleIncrease = (id) => {
    //     // this.setState(({data}) => {
    //     //     const index = data.findIndex(elem => elem.id === id);

    //     //     const old = data[index];
    //     //     const newItem = {...old, increase: !old.increase}; // ...old розвертає об'єкт, рахує його новим об'єктом і займає окрему ячейку пам'яті. Це зберігає принцип імутабельності
    //     //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //     //     return {
    //     //         data: newArr,
    //     //     }
    //     // })
        
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item;
    //         })
    //     }))
    // }
    
    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
    
    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);

            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            
            // const newArr = [...before, ...after]; // Один з способів реалізації кнопки видалення. Мінус цієї конструкції що вона
                                                     // доволі громістка

            return {
                data: data.filter(item => item.id !== id) // набагато простіший спосіб реалізації, так як filter повертає новий масив а не змінює старий
                // Приймає в себе колбек функцію
            }
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise === true);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }   
    }

    addEmployer = (name, salary) => {
        // console.log('Added');
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        } 
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render(){
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}
                />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    // onToggleIncrease={this.onToggleIncrease}
                    // onToggleRise={this.onToggleRise}
                    onToggleProp={this.onToggleProp}
                    />
                <EmployersAddForm
                    data={this.state.data}
                    onAdd={this.addEmployer}/>
            </div>
        )
    }
}

export default App;