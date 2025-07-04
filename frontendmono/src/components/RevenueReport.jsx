import React, { useEffect, useState } from 'react';
import ClientService from "../services/ClientService.js";
import { useNavigate } from 'react-router-dom';

const NOMBRE_TARIFA = {
    0: "10 vueltas o máx 10 min",
    1: "15 vueltas o máx 15 min",
    2: "20 vueltas o máx 20 min",
};

function getMonthName(month) {
    return [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ][month - 1];
}

const RevenueReport = () => {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const goToAdminSection = () => {
        navigate('/Admin');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ClientService.getAllApprovedReservations();
                const reservas = response.data;

                // Agrupar ingresos: { [año]: { [mes]: { [tipo]: total } } }
                const ingresos = {};
                reservas.forEach(r => {
                    const fecha = new Date(r.reservationDate);
                    const year = fecha.getFullYear();
                    const month = fecha.getMonth() + 1;
                    const tipo = r.reservationTariff.bookingType;
                    const precio = r.reservationTariff.basePrice || 0;
                    const numberOfPeople = r.numberOfPeople || 1;

                    if (!ingresos[year]) ingresos[year] = {};
                    if (!ingresos[year][month]) ingresos[year][month] = { 0: 0, 1: 0, 2: 0 };
                    if (tipo in ingresos[year][month]) {
                        ingresos[year][month][tipo] += precio * numberOfPeople;
                    }
                });

                // Convertir a array para la tabla
                const rows = convertIngresosToRows(ingresos);
                setTableData(rows);
                

                function getSortedKeys(obj, sortFn) {
                    return Object.keys(obj).sort(sortFn);
                }
            
                function convertIngresosToRows(ingresos) {
                    const rows = [];
                    const sortedYears = getSortedKeys(ingresos, (a, b) => b - a);
                    sortedYears.forEach(year => {
                        const sortedMonths = getSortedKeys(ingresos[year], (a, b) => a - b);
                        sortedMonths.forEach(month => {
                            rows.push(createRow(year, month, ingresos[year][month]));
                        });
                    });
                    return rows;
                }
                
                function createRow(year, month, monthData) {
                    return {
                        year,
                        month: getMonthName(Number(month)),
                        ...monthData
                    };
                }
            } catch {
                setError("Error al obtener los datos.");
            }
        };
        fetchData();
    }, []);

    // Calcular totales por tipo y general
    const totalPorTipo = { 0: 0, 1: 0, 2: 0 };
    let granTotal = 0;
    tableData.forEach(row => {
        [0, 1, 2].forEach(tipo => {
            totalPorTipo[tipo] += row[tipo] || 0;
        });
        granTotal += (row[0] || 0) + (row[1] || 0) + (row[2] || 0);
    });

    return (
        <div>
            <div>
                <p style={{ textAlign: 'left' }}>
                    <button onClick={goToAdminSection} style={{ backgroundColor: "#4a1050", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                        Volver a la vista de reservas
                    </button>
                </p>
            </div>
            <h1>Reporte de Ingresos por Mes y Año</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table border="1" cellPadding={8}>
                <thead>
                    <tr>
                        <th style={{ color: "#4a1050" }}>Año</th>
                        <th style={{ color: "#4a1050" }}>Mes</th>
                        {Object.keys(NOMBRE_TARIFA).map(tipo => (
                            <th key={tipo} style={{ color: "#4a1050" }}>{NOMBRE_TARIFA[tipo]}</th>
                        ))}
                        <th style={{ color: "#4a1050" }}>Total Mes</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, idx) => (
                        <tr key={idx}>
                            <td style={{ color: "#4a1050" }}>{row.year}</td>
                            <td style={{ color: "#4a1050" }}>{row.month}</td>
                            <td style={{ color: "#4a1050" }}>${(row[0] || 0).toLocaleString()}</td>
                            <td style={{ color: "#4a1050" }}>${(row[1] || 0).toLocaleString()}</td>
                            <td style={{ color: "#4a1050" }}>${(row[2] || 0).toLocaleString()}</td>
                            <td style={{ color: "#4a1050" }}>
                                ${((row[0] || 0) + (row[1] || 0) + (row[2] || 0)).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    <tr style={{ fontWeight: "bold", background: "#eee" }}>
                        <td colSpan={2} style={{ color: "#4a1050" }}>TOTAL</td>
                        <td style={{ color: "#4a1050" }}>${totalPorTipo[0].toLocaleString()}</td>
                        <td style={{ color: "#4a1050" }}>${totalPorTipo[1].toLocaleString()}</td>
                        <td style={{ color: "#4a1050" }}>${totalPorTipo[2].toLocaleString()}</td>
                        <td style={{ color: "#4a1050" }}>${granTotal.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RevenueReport;