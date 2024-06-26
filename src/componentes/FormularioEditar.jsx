
import { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { BsCheck2Square } from 'react-icons/bs';
import { MdOutlineEditOff } from "react-icons/md";
import { ArmadoArrayGuardar } from '../layouts/localStorage/LocalStorage';
import { formTaskStyles} from './StyleInputTask';

export const FormularioEditar = ({ tareas, setTareas, tareaAEdit, setOpen }) => {
    let auxTarea = tareaAEdit.tarea;
    const [tarea, setTarea] = useState('');
    const [error, setError] = useState(false);

    const handleChangeTarea = (e) => {
        auxTarea = e.target.value;
        setTarea(auxTarea)
        if (auxTarea.length < 3 || auxTarea.length > 50) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const editando = (e) => {
            const tareaEditada = {
                id: tareaAEdit.id,
                tarea: tarea, // Usa la tarea actualizada
                fechaLim: tareaAEdit.fechaLim, // Mantén la fecha límite original
                prioridad: tareaAEdit.prioridad, // Mantén la prioridad original
                realizada: tareaAEdit.realizada // Mantén el estado de realizada original
            };

            const tareasActualizadas = tareas.map(tarea => tarea.id === tareaAEdit.id ? tareaEditada : tarea);
            setTareas(tareasActualizadas);
         
            ArmadoArrayGuardar(tareaEditada, "edicion");
            auxTarea = '';
            setOpen(false);
            setError(false);
    }

    const cancelando = () => {
        setOpen(false);
    }



    return (
        <div style={{ padding: '20px' }}>
            <h4 style={{ textAlign: 'center' }}>EDICIÓN DE TAREA</h4>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '280px !important',
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <p style={{ visibility: error ? "visible" : "hidden", color: 'red', fontWeight: '700', fontSize: '8px' }}>La tarea debe tener entre 3 y 50 caracteres</p>

                <textarea name=""  id="filled-textarea"
                    placeholder="Edite su tarea"
                    defaultValue={tareaAEdit.tarea}
                    onChange={handleChangeTarea}
                    style={{ width: '-webkit-fill-available !important' }}></textarea>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={cancelando} type="submit" edge="end" aria-label="editar" sx={{ ...formTaskStyles.submitBtn, ...formTaskStyles.submitBtnRed }}>
                    < MdOutlineEditOff sx={formTaskStyles.iconoBtn} />
                </IconButton>
                <IconButton onClick={editando} type="submit" edge="end" aria-label="editar" sx={{ ...formTaskStyles.submitBtn, color: '#329c32', }}>
                    <BsCheck2Square sx={formTaskStyles.iconoBtn} />
                </IconButton>
            </Box>
        </div>
    );
}













// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Box } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import { BsCheck2Square } from 'react-icons/bs';
// import { ArmadoArrayGuardar } from '../layouts/localStorage/LocalStorage';
// import { formTaskStyles, inputNormal, inputError } from './StyleInputTask';
// import TextField from '@mui/material/TextField';

// export const FormularioEditar = ({ tareas, setTareas, tareaAEdit, tarAux, setTarAux }) => {

//     console.log("tareas:", tareas, "tareaAEdit:", tareaAEdit)
//     const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
//     // const [tarAux, setTarAux ]= useState(tareaAEdit.tarea)

//     console.log("tarAux:", tarAux, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q")

//     const [tarea, setTarea] = useState(tareaAEdit.tarea);
//     const handleChange = (e) => { setTarea(e.target.value) }

//     const editando = (data) => {
//         const tareaEditada = {
//             id: tareaAEdit.id,
//             tarea: data.tarea || tareaAEdit.tarea,
//             fechaLim: data.fechaLim || tareaAEdit.fechaLim,
//             prioridad: parseInt(data.prioridad) || tareaAEdit.prioridad,
//             realizada: tareaAEdit.realizada
//         };

//         // Actualizar la tarea editada en el estado de tareas
//         const tareasActualizadas = tareas.map(tarea => tarea.id === tareaAEdit.id ? tareaEditada : tarea);
//         setTareas(tareasActualizadas);

//         // Actualizar en LocalStorage u otra fuente de datos
//         ArmadoArrayGuardar(tareasActualizadas, "edicion");

//         reset(); // Reiniciar el formulario después del envío
//     };

//     // Función para actualizar el valor de un campo específico utilizando setValue
//     const updateValue = (fieldName, value) => {
//         setValue(fieldName, value);
//     };

//     return (
//         <div style={{ padding: '30px' }}>
//             <h4 style={{ textAlign: 'center' }}>EDICIÓN DE TAREA</h4>
//             <Box
//                 component="form"
//                 sx={{
//                     minWidth: '280px !important',
//                     '& .MuiTextField-root': { m: 1, width: '25ch' },
//                 }}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <TextField
//                     id="filled-textarea"
//                     label="Ingreso de tarea"
//                     placeholder="Placeholder"
//                     multiline
//                     variant="filled"
//                     value={tarea}
//                     onChange={handleChange}
//                     sx={{ width: '-webkit-fill-available !important' }}
//                 />

//                 {/* </div> */}
//             </Box>
//             <IconButton onClick={editando()} type="submit" edge="end" aria-label="editar" sx={formTaskStyles.submitBtn}>
//                 <BsCheck2Square sx={formTaskStyles.iconoBtn} />
//             </IconButton>
//             {/* </form> */}
//         </div>
//     );
// }







{/* <form onSubmit={handleSubmit(editando)} style={{ ...formTaskStyles.formCont, flexDirection: 'column' }}>
                <Box sx={{ ...formTaskStyles.inputCont, flexDirection: 'column!important' }}>
                    <div style={formTaskStyles.tareaInput}>
                        <label htmlFor="ingresoTarea" style={formTaskStyles.labelSmall}>Ingreso de tarea</label>
                        <input
                            id="ingresoTarea"
                            type="text"
                            name="tarea"
                            defaultValue={tarAux}
                            {...register('tarea', {
                                required: true,
                                maxLength: 50,
                                minLength: 3
                            })}
                            // onChange={(e) => {setValue('tarea', e.target.value); setTarAux(e.target.value); value={tarAux} }} // Actualiza el valor en useForm
                            // value={register.tarea?.value || tareaAEdit.tarea} // Usa tareaAEdit.tarea como valor por defecto
                            style={{ ...(errors.tarea ? inputError : inputNormal), ...formTaskStyles.inputStyle }}

                        />
                        {errors.tarea?.type === 'required' && <p role="alert" style={formTaskStyles.labelControl}>Tarea requerida</p>}
                        {errors.tarea?.type === 'minLength' && <p style={formTaskStyles.labelControl}>Longitud mínima: 3 caracteres</p>}
                        {errors.tarea?.type === 'maxLength' && <p style={formTaskStyles.labelControl}>Longitud máxima: 50 caracteres</p>}
                    </div>
                    <div style={formTaskStyles.inputFechaPrior}>
                        <div style={formTaskStyles.inputFecha}>
                            <label htmlFor="fechaLim" style={formTaskStyles.labelSmall}>Fecha límite</label>
                            <input
                                type="date"
                                name="fechaLim"
                                defaultValue={tareaAEdit.fechaLim}
                                {...register('fechaLim')}
                                // onChange={(e) => updateValue('fechaLim', e.target.value)} // Actualiza el valor en useForm
                                // value={register.fechaLim?.value || tareaAEdit.fechaLim}
                                style={formTaskStyles.inputStyle}
                            />
                        </div>
                        <div style={formTaskStyles.inputPrior}>
                            <label htmlFor="prioridad" style={formTaskStyles.labelSmall}>Prioridad</label>
                            <input
                                id='inpPrioridad'
                                type="range"
                                name="prioridad"
                                defaultValue={tareaAEdit.prioridad} // Convertir a string para defaultValue
                                {...register('prioridad', {
                                    required: true,
                                    min: 1,
                                    max: 5,
                                    valueAsNumber: true
                                })}
                                // onChange={(e) => updateValue('prioridad', parseInt(e.target.value))} // Actualiza el valor en useForm
                                // value={register.prioridad?.value || tareaAEdit.prioridad}
                                style={formTaskStyles.inputStyle}
                            />
                            <div style={formTaskStyles.labelMinMax}>
                                <span style={formTaskStyles.spanMinMax}>Mínima</span>
                                <span style={formTaskStyles.spanMinMax}>Máxima</span>
                            </div>
                        </div>
                    </div>
                </Box> */}