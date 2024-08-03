import ListaPaises from '../controllers/Paises.jsx';

const Register = () => {
    const options = ['Pais 1', 'Pais 2', 'Pais 3'];

    const handleSelect = (selectedOption) => {
        console.log('Selected option:', selectedOption);
    }

    return(
        <div className="extend">
            <div>
              <label htmlFor="fullName">Nombre Completo:</label>
              <input
                type="name"
                id="fullName"
              />
            </div>
            <div>
              <label htmlFor="userName">Usuario:</label>
              <input
                type="UserName"
                id="UserName"
              />
            </div>
            <div>
                <label htmlFor="pais">Pais:</label>
                <ListaPaises options={options} onSelect={handleSelect} />
            </div>
        </div>
        
        
    );
};

export default Register;