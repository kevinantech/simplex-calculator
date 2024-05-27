# Calculadora Metodo Simplex ING-SIS 2024 - 1

AUTORES:

- KEVIN ANDRES GOMEZ MEZA
- BORIS DAVID BELLO DEL RIO
- DIOGO RODRIGUEZ ACEVEDO
- JUAN DAVID NARVAEZ TORRES
- JUAN SEBASTIAN PATERNINA PAREJA

/\*\*
_ Extrae las variables auxiliares de la funcion objetivo estandarizada.
_/
const auxiliaryVariables = newObjectiveFunction.filter((newObjectiveFunctionTerm) => {
const condition =
objectiveFunctionMemo.some(
(initialObjectiveFunctionTerm) =>
initialObjectiveFunctionTerm.key === newObjectiveFunctionTerm.key
) === false;
return condition;
});
const emptyAuxiliaryVariables = auxiliaryVariables.map((term) => {
term.setCoefficient(0);
return term;
});
