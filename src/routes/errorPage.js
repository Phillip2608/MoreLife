function ErrorPage(){
    if(localStorage.getItem("name")){
        window.location.reload()
        return false
    }
    return <h1>Error</h1>
}

export default ErrorPage