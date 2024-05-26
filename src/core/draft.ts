function convertToStandardForm(data) {
  const { objective, ofTerms, constraints } = data;
  const standardConstraints = [];
  const variables = Object.keys(ofTerms);

  constraints.forEach((constraint, index) => {
    const newConstraint = { ...constraint };
    if (constraint.type === "greater") {
      // Convertir a <= multiplicando por -1
      for (const key in newConstraint) {
        if (key !== "type") {
          newConstraint[key] *= -1;
        }
      }
      newConstraint.type = "less";
    } else if (constraint.type === "equal") {
      // Crear dos restricciones, una <= y otra >= (que se convierte a <=)
      const lessConstraint = { ...newConstraint, type: "less" };
      const greaterConstraint = { ...newConstraint, type: "less" };
      for (const key in greaterConstraint) {
        if (key !== "type") {
          greaterConstraint[key] *= -1;
        }
      }
      standardConstraints.push(lessConstraint);
      standardConstraints.push(greaterConstraint);
      return;
    }
    standardConstraints.push(newConstraint);
  });

  return { objective, ofTerms, constraints: standardConstraints };
}
