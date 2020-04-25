import {createContext} from 'react';

export const EmployeeContext = createContext ({
  employees: [],
  addEmployee: emp => {},
  deleteEmployee: _id => {},
  updateEmployee: (_id, updated_emp) => {},
  selectedEmployee: {},
  setSelectedEmployee: emp => {},
});
