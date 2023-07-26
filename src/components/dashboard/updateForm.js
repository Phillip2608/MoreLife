import ButtonForm from '../form/buttonForm'

function UpdateForm(props){
    return (
        <div>
            <h2>{props.formName}</h2>
            <form onSubmit={props.handleSubmit}>
                 {props.children}
                 <ButtonForm text={props.txtBtn}/>
            </form>
        </div>
    )
}

export default UpdateForm