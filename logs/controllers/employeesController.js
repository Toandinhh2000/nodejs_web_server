const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewemployee = (req, res) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
  })
}

const updateEmployee = (req, res) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "id": req.params.id
  })
}

module.export = {
  getAllEmployees,
  createNewemployee,
  updateEmployee,
  getEmployee
}