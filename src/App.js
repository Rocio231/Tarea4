import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField/InputField';
import Button from './components/Button/Button';

function App() {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellidos: '',
    telefonos: '',
    habitacion: '',
    rh: '',
    fechaInicio: '',
    fechaSalida: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
  
    // Validación básica: campo no debe estar vacío
    if (!value.trim()) {
      errorMessage = `${name} es obligatorio`;
    } else {
      // Validaciones personalizadas
      switch (name) {
        case 'nombre':
        case 'apellidos':
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            errorMessage = `${name} solo debe contener letras`;
          }
          break;
        case 'telefonos':
          if (!/^\d{1,13}$/.test(value)) {
            errorMessage = `${name} solo debe contener hasta 13 números`;
          }
          break;
        case 'habitacion':
          if (!/^\d+$/.test(value)) {
            errorMessage = `${name} solo debe contener números`;
          }
          break;
        case 'fechaInicio':
          if (formData.fechaSalida && new Date(value) > new Date(formData.fechaSalida)) {
            errorMessage = `La fecha de inicio no debe ser posterior a la fecha de salida`;
          }
          break;
        case 'fechaSalida':
          if (formData.fechaInicio && new Date(value) < new Date(formData.fechaInicio)) {
            errorMessage = `La fecha de salida no debe ser anterior a la fecha de inicio`;
          }
          break;
        default:
          break;
      }
    }
  
    setErrors(prevState => ({ ...prevState, [name]: errorMessage }));
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    for (let field in formData) {
      if (!formData[field].trim()) {
        setErrors(prevState => ({ ...prevState, [field]: `${field} es obligatorio` }));
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      console.log("Datos enviados:", formData);
    }
  }

  return (
    <div className="app">
     <h1> Registro de Hotel</h1>
      <form onSubmit={handleSubmit}>
        <InputField 
          label="Identificación" 
          name="identificacion"
          value={formData.identificacion}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.identificacion}
        />
        <InputField 
          label="Nombre" 
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.nombre}
        />
        <InputField 
          label="Apellidos" 
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.apellidos}
        />
        <InputField 
          label="Teléfonos" 
          name="telefonos"
          value={formData.telefonos}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.telefonos}
        />
        <InputField 
          label="Habitación" 
          name="habitacion"
          value={formData.habitacion}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.habitacion}
        />
      <InputField 
        label="RH (Grupo sanguíneo)" 
        type="select"
        name="rh"
        options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
        value={formData.rh}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.rh}
      />
        <div className="date-fields">
          <InputField 
            label="Fecha de inicio" 
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fechaInicio}
          />
          <InputField 
            label="Fecha de salida" 
            type="date"
            name="fechaSalida"
            value={formData.fechaSalida}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fechaSalida}
          />
        </div>
        <div className="navigation-buttons">
          <Button label="←" />
          <Button label="→" />
        </div>
        <div className="action-buttons">
          <Button label="Registrar" type="submit" />
          <Button label="Cancelar" />
        </div>
      </form>
    </div>
  );
}

export default App;
