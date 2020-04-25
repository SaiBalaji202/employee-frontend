import React, {useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import Table from './../../shared/components/Table/Table';
import DeleteButton from './../../shared/components/UIElements/DeleteButton';
import {EmployeeContext} from './../context/employee-context';

export default function EmployeeTable({employees, onEmployeeDelete}) {
  const {setSelectedEmployee} = useContext (EmployeeContext);

  const columns = useRef ([
    {
      path: 'name',
      label: 'Name',
    },
    {
      path: 'status',
      label: 'Status',
    },
    {
      path: 'date',
      label: 'Date',
    },
    {
      key: 'delete',
      label: 'Delete',
      content: emp => <DeleteButton onDelete={() => onEmployeeDelete (emp)} />,
    },
  ]);

  return (
    <div>
      <Table
        columns={columns.current}
        data={employees}
        onClick={selectedEmployee => setSelectedEmployee (selectedEmployee)}
      />
    </div>
  );
}

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
  onEmployeeDelete: PropTypes.func.isRequired,
};
