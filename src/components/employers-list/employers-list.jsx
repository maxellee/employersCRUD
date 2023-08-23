import EmployersListItem from "../employers-list-item/employers-list-item";
import './employers-list.css';
const EmployersList = ({data, onDelete, onToggleProp, onToggleIncrease, onToggleRise}) => {

    const elements = data.map(prop => {
        let {id, ...itemsProps} = prop; // Один з крутих прийомів, якій дозволяє не деструктуризувати інші атрибути, коли потрібен лише 1
        return (
            // <EmployersListItem name={prop.name} salary={prop.salary}/>
            <EmployersListItem 
                key={id} 
                {...itemsProps}
                onDelete={() => onDelete(id)}
                // onToggleIncrease={() => onToggleIncrease(id)}
                // onToggleRise={() => onToggleRise(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                /> // альтернативний синтаксис через оператор spread
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;