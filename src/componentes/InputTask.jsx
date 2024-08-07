import { useState} from 'react';
import { useForm } from "react-hook-form";
import { Box } from '@mui/material';
import { FormTaskStyles, inputNormal, inputError } from './StyleInputTask'
import { OrdenFechaPrioridad } from './OrdenFechaPrioridad';
import { ArmadoArrayGuardar, Guardar } from '../layouts/localStorage/LocalStorage';
import IconButton from '@mui/material/IconButton';
import { BsCheck2Square } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';



export const InputTask = ({ setTareas,  setFiltro , theme}) => {
    const formTaskStyles = FormTaskStyles({ theme });
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [prioridad, setPrioridad] = useState(1);
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Formatear la fecha como "YYYY-MM-DD"
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    const formattedDate = `${year}-${month}-${day}`;

    const onSubmit = (obj) => {
        obj.id = uuidv4();
        obj.realizada = false;
        obj.fechaRealiz = "";
        setPrioridad(1); 
        let nuevasTareas = ArmadoArrayGuardar(obj, "nuevaTarea");
        let nuevasTareasOrd = OrdenFechaPrioridad (nuevasTareas);
        setTareas(nuevasTareasOrd)
        reset(); 
        setFiltro("TODAS");
        Guardar("filtro", "TODAS")
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={formTaskStyles.formCont}>
                <Box sx={formTaskStyles.inputCont}>
                    <Box sx={formTaskStyles.tareaInput}>
                        <label htmlFor="ingresoTarea" style={formTaskStyles.labelSmall}>Ingreso de tarea</label>
                        <input
                            id="ingresoTarea"
                            type="textarea"
                            name="ingresoTarea"
                            {...register('tarea', {
                                required: true,
                                maxLength: 50,
                                minLength: 3
                            })}
                            style={{ ...(errors.tarea ? inputError : inputNormal), ...formTaskStyles.inputStyle }}
                        />
                        {errors.tarea?.type === 'required' && <p role="alert" style={formTaskStyles.labelControl}>Tarea requerida</p>}
                        {errors.tarea?.type === 'minLength' && <p style={formTaskStyles.labelControl}>Longitud: más de 2 caracteres</p>}
                        {errors.tarea?.type === 'maxLength' && <p style={formTaskStyles.labelControl}>Longitud: 50 caracteres, máximo</p>}
                        <p style={{ visibility: 'hidden', height: '16px' }}>Guardar espacio</p>
                    </Box>
                    <Box sx={{...formTaskStyles.inputFechaPrior}}>
                        <div style={formTaskStyles.inputFecha}>
                            <label htmlFor="fechaLim" style={formTaskStyles.labelSmall}>Fecha límite</label>
                            <input
                                type="date"
                                name="fechaLim"
                                defaultValue={formattedDate}
                                min={formattedDate}
                                {...register('fechaLim')}
                                style={formTaskStyles.inputStyle}
                            />
                        </div>
                        <div style={formTaskStyles.inputPrior}>
                            <label htmlFor="prioridad" style={formTaskStyles.labelSmall}>Prioridad</label>
                            <input
                                id='inpPrioridad'
                                type="range"
                                name="prioridad"
                                defaultValue={1} 
                                min={1}
                                max={5}
                                step={1}
                                {...register('prioridad', {
                                    required: true,
                                    min: 1,
                                    max: 5,
                                    valueAsNumber: true 
                                })}
                            />
                            <div style={formTaskStyles.labelMinMax}>
                                <span style={formTaskStyles.spanMinMax}>Mínima</span>
                                <span style={formTaskStyles.spanMinMax}>Máxima</span>
                            </div>
                        </div>
                    </Box>
                </Box>
                <IconButton type="submit" edge="end" aria-label="grabar" sx={{...formTaskStyles.submitBtn, color: theme.palette.primary.iconBtn ,}} >
                    <BsCheck2Square sx={formTaskStyles.iconoBtn} />
                </IconButton>
            </form>
        </>
    )
}
