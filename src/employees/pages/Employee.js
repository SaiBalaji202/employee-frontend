import React, {useState, useRef, useCallback, useEffect} from 'react';
import {toast} from 'react-toastify';

import Search from '../../shared/components/Inputs/Search';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from './../components/EmployeeForm';

import './Employee.css';
import Pagination from './../../shared/components/UIElements/Pagination';
import DropDown from '../../shared/components/Inputs/DropDown';
import {paginate} from './../../shared/utils/paginate';
import ErrorMessage from '../../shared/components/UIElements/ErrorMessage';
import {EmployeeContext} from './../context/employee-context';

import useHttp from './../../shared/hooks/http-hook';
import Spinner from './../../shared/components/UIElements/Spinner';
import ErrorModal from './../../shared/components/Modals/ErrorModal';
import ConfirmModal from './../../shared/components/Modals/ConfirmModal';

export default function Employee () {
  const [employees, setEmployees] = useState ([]);
  const [empToDelete, setEmpToDelete] = useState ();

  const [sendRequest, isLoading, error, clearError] = useHttp ();

  const [currentPage, setCurrentPage] = useState (1);
  const pageSizeOptions = useRef ([3, 5, 10]);
  const [pageSize, setPageSize] = useState (pageSizeOptions.current[0]);

  let [queriedEmployees, setQueriedEmployees] = useState ();
  let [filteredEmployees, setFilteredEmployees] = useState ([]);
  const [selectedEmployee, setSelectedEmployee] = useState ();

  const onEmployeeDelete = useCallback (emp => {
    setEmpToDelete (emp);
  }, []);

  const searchEmployee = name => {
    if (name) {
      const queriedEmployees = employees.filter (employee =>
        employee.name.startsWith (name)
      );
      setQueriedEmployees (queriedEmployees);
    } else {
      setQueriedEmployees ();
    }
  };

  const pageSizeChanged = newPageSize => {
    setPageSize (parseInt (newPageSize));
    setCurrentPage (1);
  };

  const loadPageData = newPage => setCurrentPage (newPage);

  const addEmployee = async emp => {
    try {
      const newEmp = await sendRequest (
        'http://localhost:5000/employee',
        'POST',
        {'Content-Type': 'application/json'},
        JSON.stringify (emp)
      );
      setEmployees ([newEmp, ...employees]);
      setSelectedEmployee ();
      toast.success ('Added Successfully');
    } catch (error) {}
  };

  const deleteEmployee = async _id => {
    try {
      await sendRequest (`http://localhost:5000/employee/${_id}`, 'DELETE');

      setEmployees (employees.filter (emp => emp.id !== _id));
      setSelectedEmployee ();
      toast.success ('Deleted Successfully');
    } catch (error) {}
  };

  const updateEmployee = async (_id, emp) => {
    try {
      const newEmp = await sendRequest (
        `http://localhost:5000/employee/${_id}`,
        'PUT',
        {'Content-Type': 'application/json'},
        JSON.stringify (emp)
      );
      setEmployees (
        employees.map (employee => {
          if (employee.id !== _id) return employee;
          return newEmp;
        })
      );
      toast.success ('Updated Successfully');
      setSelectedEmployee ();
    } catch (error) {}
  };

  useEffect (
    () => {
      const emps = queriedEmployees || employees;
      setFilteredEmployees (paginate (emps, currentPage, pageSize));
    },
    [employees, queriedEmployees, currentPage, pageSize]
  );

  useEffect (
    () => {
      try {
        const fetchEmployees = async () => {
          const res = await sendRequest ('http://localhost:5000/employees');
          setEmployees (res.employees);
        };
        fetchEmployees ();
      } catch (error) {}
    },
    [sendRequest, setEmployees]
  );

  const emps = queriedEmployees || employees;
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployee,
        setSelectedEmployee,
        addEmployee,
        deleteEmployee,
        updateEmployee,
      }}
    >
      <div className="employee-container">
        {isLoading && <Spinner asOverlay />}
        <ErrorModal onClose={clearError} error={error} />

        {empToDelete &&
          <ConfirmModal
            message={`Do you want to delete ${empToDelete.name} (id: ${empToDelete.id})?`}
            show={!!empToDelete}
            confirm={{
              className: 'btn-danger',
              label: 'Delete',
              onClick: () => {
                deleteEmployee (empToDelete.id);
                setEmpToDelete ();
                setSelectedEmployee ();
              },
            }}
            cancel={{
              onClick: () => setEmpToDelete (),
            }}
          />}

        <div>
          <h3>All Employees</h3>
          <Search placeholder="Search Name..." onSearch={searchEmployee} />
          {emps.length === 0
            ? <ErrorMessage message="No Employees Found :(" />
            : <React.Fragment>
                <EmployeeTable
                  employees={filteredEmployees || employees}
                  onEmployeeDelete={onEmployeeDelete}
                />
                <div className="employees-footer">
                  <DropDown
                    id="page-size"
                    options={pageSizeOptions.current}
                    onChange={pageSizeChanged}
                  />
                  <Pagination
                    currentPage={currentPage}
                    itemsCount={emps.length}
                    pageSize={pageSize}
                    onPageChange={loadPageData}
                  />
                </div>
              </React.Fragment>}

        </div>
        <div>
          <EmployeeForm />
        </div>
      </div>
    </EmployeeContext.Provider>
  );
}
