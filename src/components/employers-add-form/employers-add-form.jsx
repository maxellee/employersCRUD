import { Component } from 'react';

import './employers-add-form.css';

class EmployersAddForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            salary: '',
        }
        // this.maxId = 4;
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value // e.target.name бере своє ім'я з імені інпута а e.target.value цього ж інпута дає йому значення
            // це записує нові дані в state і дозволяє їх деструктуризувати і використовувати
            // Після запису даних setState викликає метод render знову, щоб відрендерити нові дані
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: '',
        })
    }
    // onAdd = (e) => {
    //     // e.preventDefault();
    //     // this.setState({
    //     //     name: this.state.name,
    //     //     salary: this.state.salary,
    //     // })
    // }

    render(){
        
        const {name, salary} = this.state;
        return (
            <div className="app-add-form">
                <h3>Додайте нового співробітника</h3>
                <form className="add-form d-flex"
                onSubmit={this.onSubmit}>
                    <input type="text" 
                           className="form-control new-post-label"
                           placeholder="Як його звати?" 
                           onChange={this.onValueChange}
                           name="name"
                           value={name}/>
                           {/* Якщо value стоїть в тому ключі який використовується в state, то в такому випадку
                                в value записується актуальне значення компонента
                                значення value інпута контролюється реактом, а сам елемент буде називатись контролюємим
                           */}
                    <input type="text" 
                           className="form-control new-post-label"
                           placeholder="З/П в $?" 
                           onChange={this.onValueChange}
                           name="salary"
                           value={salary}/>
    
                    <button className="btn btn-outline-light"
                    type="submit">Додати</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;