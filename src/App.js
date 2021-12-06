import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import MvtForm from "./components/MvtForm";
import MvtList from "./components/MvtList";

const App = () => {
  //Modelo con la lista principal de movimientos guardados
  const [mvts, setMvts] = useState([]);
  const [title, setTitle] = useState("PARCIAL 1");

  //Filtros del usuario establecidos para mostrar la lista
  let _searchFilter = "";
  let _typeMvtFilter = "Todos";

  //Modelo con la lista de movimientos que se filtran a partir de la principal usando los filtros establecidos por el usuario
  const [mvtsFiltered, setMvtsFiltered] = useState([]);

  //Modelo con los datos para calcular el balance correctamente
  const [balance, setBalance] = useState({
    initialBalance: 0.0,
    totalMvts: 0.0,
    finalBalance: 0.0,
  });

  //Use efect para actualizar en tiempo real el saldo final de acuerdo a los movimientos registrados y para que se refresque la lista filtrada si cambia por algun motivo la lista de movimientos (mvts)
  useEffect(() => {
    const total = mvts.reduce(
      (total, mvt) =>
        (total =
          mvt.typeMvt === "Ingreso"
            ? parseFloat(total) + parseFloat(mvt.qty)
            : parseFloat(total) - parseFloat(mvt.qty)),
      0
    );
    setBalance({
      ...balance,
      totalMvts: total,
      finalBalance: parseFloat(balance.initialBalance) + parseFloat(total),
    });

    refreshList();
  }, [mvts]);

  const updateInitialBalance = (initialBalance) => {
    setBalance({
      ...balance,
      initialBalance: parseFloat(initialBalance),
      finalBalance: parseFloat(initialBalance) + parseFloat(balance.totalMvts),
    });
  };

  //Establece el filtro obtenido desde la caja de texto para filtrar por nombre del concepto y se refresca la lista para aplicarlo
  const establishSearchFilter = (searchFilter) => {
    _searchFilter = searchFilter; //Actualiza variable auxiliar de trabajo _searchFilter con el valor recibido desde el componente hijo
    refreshList();
  };

  //Establece el filtro obtenido desde los checkbox para filtrar por tipo de movimiento y se refresca la lista para aplicarlo
  const establishTypeMvtFilter = (typeMvtFilter) => {
    _typeMvtFilter = typeMvtFilter; //Actualiza variable auxiliar de trabajo _typeMvtFilter con el valor recibido desde el componente hijo
    refreshList();
  };

  //Se encarga de mantener la lista actualizada y filtrada de acuerdo a los parámetros establecidos por el usuario en filtros usando las variables de trabajo _searchFilter y _typeMvtFilter
  const refreshList = () => {
    let filter = mvts.filter(
      (mvt) =>
        mvt.name.toLowerCase().includes(_searchFilter.toLowerCase()) && //Coincidencia con el texto buscado por el usuario, en caso de estar vació todos coincidirán
        (_typeMvtFilter === "Todos" || mvt.typeMvt === _typeMvtFilter) //Para filtrar el tipo de movimiento en caso de estar establecido el radio button "Todos" se obtendrán todos los tipos de movimientos
    );

    setMvtsFiltered(filter); //Se actualiza el UseState "MvtsFiltered" que contiene la lista filtrada (Al realizarse esto se repinta la lista con la información actualizada de acuerdo a los filtros del usuario)
  };

  //Agrega un movimiento a la lista principal de movimientos
  const addMvt = (mvt) => {
    setMvts([...mvts, mvt]);
  };

  //Elimina un movimiento a la lista principal de movimientos
  const removeMvt = (id) => {
    setMvts(mvts.filter((mvt) => mvt.id !== id));
  };

  //Actualiza un movimiento a la lista principal de movimientos
  const editMvt = (mvtEdited) => {
    setMvts(
      mvts.map((mvt) => {
        if (mvt.id === mvtEdited.id) {
          return {
            ...mvt,
            typeMvt: mvtEdited.typeMvt,
            name: mvtEdited.name,
            qty: mvtEdited.qty,
          };
        }
        return mvt;
      })
    );
  };

  return (
    <Container fluid={true}>
      <Header
        title={title}
        balance={balance}
        updateInitialBalance={updateInitialBalance}
      />
      <Row>
        <Col xs={5}>
          <MvtForm balance={balance} addMvt={addMvt} />
        </Col>
        <Col xs={6}>
          <MvtList
            balance={balance}
            mvts={mvtsFiltered}
            establishSearchFilter={establishSearchFilter}
            establishTypeMvtFilter={establishTypeMvtFilter}
            removeMvt={removeMvt}
            editMvt={editMvt}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
