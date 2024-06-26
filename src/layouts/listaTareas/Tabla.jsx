import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { tablaTaskStyles } from '../../componentes/StyleListTask';
import { Guardar, Recuperar, RecuperarFiltro } from '../localStorage/LocalStorage';
import { VentModal } from '../../componentes/Modal';
import { Filtros } from '../filtros/Filtros';
import { GetPrioridadText } from '../../componentes/ConversPrioridad';
import { FechaAAAAMMDD, FechaLS_AAAAMMDD, FechaLS_DDMMAAA } from '../../componentes/ConvertirFecha';
import { FechaPasada } from '../../componentes/FechaPasada';


export const Tabla = ({ tareas, setTareas, filtro, setFiltro }) => {
    let tareasLS;
    let tareaAEditar;
    let tareaABorrar
    const [open, setOpen] = useState(false);
    const [tareaAEdit, setTareaAEdit] = useState({});
    const [tareaABorr, setTareaABorr] = useState({})
    const [montarComponente, setMontarComponente] = useState(false);
    const [montarComponenteBorrar, setMontarComponenteBorrar] = useState(false);
    const [tiempoVencido, setTiempoVencido] = useState(false);

    const handleChangeCheck = (id) => {
        let tareasLS = Recuperar();
        const nuevasTareas = tareasLS.map(tarea => {
            if (tarea.id === id) {
                return {
                    ...tarea,
                    realizada: !tarea.realizada
                };
            }
            return tarea;
        });
        Guardar("tareas", nuevasTareas);
        setTareas(nuevasTareas);

        //Voy a filtrar para mostrar según el select
        tareasLS = Recuperar();
        let filtroLS = RecuperarFiltro();
        let tareasFiltradas = [];
        switch (filtroLS) {
            case 'TODAS':
                tareasFiltradas = tareasLS;
                setTareas(tareasFiltradas);
                break;
            case 'COMPLETAS':
                tareasFiltradas = tareasLS.filter(tarea => tarea.realizada);
                setTareas(tareasFiltradas);
                break;
            case 'INCOMPLETAS':
                tareasFiltradas = tareasLS.filter(tarea => !tarea.realizada);
                setTareas(tareasFiltradas);
                break;
            default:
                tareasFiltradas = tareas;
        }
    };

    const editarTarea = (id) => {
        tareasLS = Recuperar();
        tareaAEditar = tareasLS.find(tarea => tarea.id === id);
        setTareaAEdit(tareaAEditar);
        setOpen(true);
        setMontarComponente(true); // Cambia montarComponente a true al editar tarea
    };

    const borrarTarea = (id) => {
        tareasLS = Recuperar();
        tareaABorrar = tareasLS.find(tarea => tarea.id === id);
        setTareaABorr(tareaABorrar);
        setOpen(true);
        setMontarComponenteBorrar(true);
    };

    const elegirMje = (alertaTiempo) => {
        if (alertaTiempo === 1) {
            return ("Fecha excedida")
        }
        if (alertaTiempo === 2) {
            return ("Fecha límite cercana")
        }
        if (alertaTiempo === 3) {
            return ("Aún hay tiempo")
        }

    }

    return (
        <>
            <div style={tablaTaskStyles.contTitFilt}>
                <h5 style={tablaTaskStyles.titTabla}>LISTA  DE  TAREAS</h5>
                <Filtros tareas={tareas} setTareas={setTareas} filtro={filtro} setFiltro={setFiltro} />
            </div>
            {tareas.length > 0 ? (
                <TableContainer sx={tablaTaskStyles.tableContainer}>
                    <Table sx={tablaTaskStyles.table} aria-label="simple table">
                        <TableHead sx={tablaTaskStyles.tableHead}>
                            <TableRow sx={tablaTaskStyles.tableRowHead}>
                                <TableCell sx={tablaTaskStyles.tableCellTarea}>Tarea</TableCell>
                                <TableCell align="center" sx={tablaTaskStyles.tableCellPriorHead}>
                                    <div style={{ fontSize: '14px', width: '85px' }}>Fecha Límite</div>
                                    <div style={{ fontSize: '14px', width: '95px', paddingLeft: '10px' }}>Prioridad</div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tareas.map((loc) => {
                                const { id, realizada, tarea, prioridad, fechaLim } = loc;
                                const labelId = `checkbox-${id}`;
                                const editId = `edit-${id}`;
                                const deleteId = `delete-${id}`;
                                const alertaTiempo = FechaPasada(loc)
                                const mje = elegirMje(alertaTiempo)


                                return (
                                    <TableRow key={id} sx={tablaTaskStyles.tableRow}>
                                        <TableCell component="th" scope="row" sx={{ ...tablaTaskStyles.tableCell, border: '0px' }}>
                                            <div style={tablaTaskStyles.centrado}>
                                                <Checkbox
                                                    edge="start"
                                                    checked={realizada}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={() => handleChangeCheck(id)}
                                                    sx={{ ...tablaTaskStyles.checkBox, padding: '0px', marginTop: '3px' }}
                                                />
                                                <p id='tareaTabla' style={{ ...tablaTaskStyles.tareaTabla, color: realizada ? '#b9c9bb' : 'black', paddingLeft: '30px' }}>{tarea}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" sx={tablaTaskStyles.tableCellPriorRow}>
                                            <Box sx={ tablaTaskStyles.contCellPriorRow }>
                                                <Box sx={{ ...tablaTaskStyles.palabraPrior, color: realizada ? '#b9c9bb' : 'black', 
                                                    marginTop: '2px', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '85px', flexDirection: 'column', color: alertaTiempo === 3 ? '#049404' : (alertaTiempo === 2 ? '#f67c2f' : (alertaTiempo === 1 ? '#ff0000' : '#b9c9bb')) }}>
                                                    {FechaLS_DDMMAAA(fechaLim)} <span style={{ fontSize: '8px', fontWeight: 700, textAlign: 'center' }}>{mje}</span>
                                                </Box>
                                                <Box sx={tablaTaskStyles.contPrior}>
                                                    <Box sx={{ ...tablaTaskStyles.contPalabraPrior }}>
                                                        <span style={{ ...tablaTaskStyles.palabraPrior, color: realizada ? '#b9c9bb' : 'black', marginTop: '15px' }}>Prioridad </span>
                                                    </Box>
                                                    <Box sx={{ width: '55px', display: 'flex', justifyContent: 'flex-start' }}>
                                                        <p style={{ color: realizada ? '#b9c9bb' : 'black', width: '60px', textAlign: 'left' }}>
                                                            {GetPrioridadText(prioridad)}
                                                        </p>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box sx={tablaTaskStyles.contIconosTabla}>
                                                <IconButton onClick={() => editarTarea(id)} edge="end" aria-label="edit" id={editId} sx={{ ...tablaTaskStyles.iconoBtn, color: realizada ? '#b9c9bb' : 'black' }}>
                                                    <BsPencilSquare />
                                                </IconButton>
                                                <IconButton onClick={() => borrarTarea(id)} edge="end" aria-label="delete" id={deleteId} sx={{ ...tablaTaskStyles.iconoBtn, color: realizada ? '#d99595' : 'red' }}>
                                                    <BsTrash3 />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div style={{ border: '1px solid #c0b7b7', borderRadius: '4px', paddingBlock: '20px', paddingInline: '15px' }}>
                    <p style={{ textAlign: 'center', color: 'red', fontSize: '15px' }}>No hay tareas para mostrar.</p>
                    <p style={{ marginTop: '10px', textAlign: 'center', color: 'green', fontSize: '12px' }}>Modifique el filtro o ingrese una nueva tarea.</p>
                </div>
            )}

            <VentModal tareas={tareas} setTareas={setTareas} open={open} setOpen={setOpen} tareaAEdit={tareaAEdit} setTareaAEdit={setTareaAEdit} tareaABorr={tareaABorr} setTareaABorr={setTareaABorr} montarComponente={montarComponente} setMontarComponente={setMontarComponente} montarComponenteBorrar={montarComponenteBorrar} setMontarComponenteBorrar={setMontarComponenteBorrar} />

        </>
    );
};
