'use client'

import { useCallback, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Input
} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { capitalize } from "../utils/capitalize";
import { ChevronDownIcon } from "../utils/chevronDownIcon";
import { useUsers } from "../hooks/users";

export default function Datatable(props) {
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const { newUsers } = useUsers();
  const { isOpen, onOpen, onOpenChange, onClose  } = useDisclosure();

  const data = props.data;
  const columns = props.columns;
  const INITIAL_VISIBLE_COLUMNS = props.initialColumns;

  const statusColorMap = {
    0: "danger",
    1: "success",
    2: "warning",
  };
  const statusLabel = {
    0: "Inactive",
    1: "Active",
    2: "warning",
  };

  const statusOptions = [
    { name: "Activo", uid: "active" },
    { name: "Inactivo", uid: "inactive" },
    { name: "Vacaciones", uid: "vacations" },
  ];

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(data.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    filteredUsers = [];
    if (data.length > 0) {
      var filteredUsers = [...data];
    }

    if (hasSearchFilter) {
      filteredUsers = filteredUsers
        .filter((data) =>
          columns.map((column) => data[column.uid]).join(" ").toLowerCase().includes(filterValue.toLowerCase()),
        );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [data, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: data.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={data.cuit}
            name={cellValue + ' ' + (data.last_name ? data.last_name : '')}
            color="primary"
          >
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">{data.company}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[data.status]}
            size="sm"
            variant="dot"
          >
            {statusLabel[data.status]}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-white border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem><FontAwesomeIcon icon={faEye} /> Ver</DropdownItem>
                <DropdownItem><FontAwesomeIcon icon={faPenToSquare} /> Editar</DropdownItem>
                <DropdownItem><FontAwesomeIcon icon={faTrashCan} /> Eliminar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center gap-4">
        <div className="flex justify-end items-center">
          <label className="flex items-center text-default-400 text-small">
            <select
              className="bg-transparent rounded-lg outline-none text-default-400 text-tiny border-1 border-gray-300 cursor-pointer"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>
        <Input
          placeholder="Buscar..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          className="w-full sm:max-w-[44%] no-border-input"
          variant="bordered"
          onValueChange={onSearchChange}
        />
        <div className="flex justify-between gap-3 items-center">
          <div className="flex gap-3">
            {columns.some(item => item.uid === "status") ? (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Estado
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : ''}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns
                  .filter((column) => column.uid !== 'id' && column.uid !== 'actions')
                  .map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="success"
              className="text-white"
              onPress={onOpen}
            >
              Nuevo
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-default-400 text-small">{data.length} registro{data.length != 1 ? 's' : ''}</span>
        <Pagination
          showControls
          color="primary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div></div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  ); 
      
      
  const [formValues, setFormValues] = useState<Record<string, string>>(
    Array.isArray(props.inputs)
      ? props.inputs.reduce((acc, input) => {
          acc[input.name] = ''; // valor inicial vacío
          return acc;
        }, {})
      : {}
  );
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitCreateNew = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onClose();
      switch (props.controler) {
        case 'user':
          newUsers({
              setErrors,
              setStatus,
              formValues,
          });
          break;
      
        default:
          break;
      }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                CREAR NUEVO
                <p className="text-gray-400 font-normal text-base -mb-3">
                  Los campos que tengan <span className='text-red-500'>*</span> son obligatorios.
                </p>
              </ModalHeader>
              <ModalBody>
                <form method="POST" onSubmit={submitCreateNew} className="flex flex-wrap">
                  {props.inputs && props.inputs
                    .filter(input => input.type != 'select')
                    .map((input, index) => (
                      <div className='w-1/2'>
                        <div className="p-1" key={index}>
                          <label htmlFor={input.name}>{input.placeholder}{input.required && <span className='text-red-500'> *</span>}</label>
                          <Input
                            className="no-border-input"
                            type={input.type}
                            name={input.name}
                            onChange={handleChange}
                            placeholder={input.placeholder}
                            required={input.required}
                            id={input.name}
                          />
                        </div>
                      </div>
                    ))}
                  {props.inputs && props.inputs
                    .filter(input => input.type == 'select')
                    .map((input, index) => (
                      <div className='w-1/2'>
                        <div className="p-1" key={index}>
                          <label htmlFor={input.name}>{input.placeholder}{input.required && <span className='text-red-500'> *</span>}</label>
                          <Select name={input.name} isRequired={input.required} onChange={handleChange} className="" placeholder={'Seleccione ' + input.placeholder}>
                            {input.options.map((option) => (
                              <SelectItem value={option.id} key={option.id}>{option.name}</SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    ))}
                  <div className='flex w-full gap-1 mt-8'>
                    <Button color="danger" type='button' variant="light" onPress={onClose} className="w-full">
                      Cancelar
                    </Button>
                    <Button color="primary" type='submit' className="w-full">
                      Guardar
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No se encontraron registros para mostrar."} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
