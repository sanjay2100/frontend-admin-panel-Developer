import React, { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Grid, TextField, Button, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import { Stack } from '@mui/system';
// import { GetGroups } from 'API/Groups/apis';
// import { getApi, getById } from 'API/Products/apis';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


const AccessManagement = () => {
  const dataref = React.useRef();

  const [ErrGrp, setErrGrp] = useState(false)
  const [ErrProduct, setErrProduct] = useState(false)


  const [Data, setData] = React.useState({
    access: []
  });
  const [Access, setAccess] = useState({
    product_id: '',
    product_name: '',
    actions: {
      Create: false,
      delete: false,
      approve: false,
      download: false,
      edit: false,
      update: false
    }
  })
  const AccessType = [
    { name: "Create", value: "Create" },
    { name: "Edit", value: "edit" },
    { name: "Update", value: 'update' },
    { name: "Delete", value: 'delete' },
    { name: "Approve", value: 'approve' },
    { name: "Download", value: 'download' }
  ]

  const [FieldAccess, setFieldAccess] = React.useState({});

  const [display_name, setDisplayName] = useState({});


  const [PostData, setPostData] = useState({
    group_id: "",
    group_name: "",
    products: []
  })

  const handleChange = (field, value) => {
    console.log(value);
    switch (field) {
      case 'group':
        setErrGrp(false)
        setData({ ...Data, group: value._id });
        setDisplayName({ ...display_name, group: value.name });
        setPostData({ ...PostData, group_id: value._id, group_name: value.name })
        break;
      case 'product':
        setErrProduct(false)
        setData({ ...Data, Product: value._id });
        setDisplayName({ ...display_name, Product: value.product_name });
        setAccess({ ...Access, product_id: value._id, product_name: value.product_name })
        console.log("changeproduct ", value);
        break;

      case 'Create':
        setAccess({
          ...Access,
          actions: {
            ...Access.actions,
            Create: value === "true" ? true : false
          }
        });
        break;

      case 'Edit':
        setAccess({
          ...Access,
          actions: {
            ...Access.actions,
            edit: value === "true" ? true : false
          }
        });
        break;

      case 'Update':
        setAccess({
          ...Access,
          actions: {
            ...Access.actions,
            update: value === "true" ? true : false
          }
        });
        break;
      case 'Delete':
        setAccess({
          ...Access,
          actions: {
            ...Access.actions,
            delete: value === "true" ? true : false
          }
        });
        break;

      case 'Approve':
        setAccess({
          ...Access,
          actions: {
            ...Access.actions,
            approve: value === "true" ? true : false
          }
        });
        break;

      case 'Download':
        setAccess({
          ...Access,
          actions: {
            ...Access.actions,
            download: value === "true" ? true : false
          }
        });
        break;
      default:
        break;
    }
  };
  console.log("postdata ", PostData);

  console.log("Access ", Access);


  // const [group, setGroup] = useState(null);
  //const [Product, setProduct] = useState(null);

  const group = [{ _id: '1', name: 'da' }, { _id: '2', name: 'Agent' }]
  const Product = [{ _id: '1', product_name: 'sbi' }, { _id: '2', product_name: 'hdfcs' }]

  // const getGroup = () => {
  //   GetGroups(setGroup);
  //   getApi(setProduct);
  // };

  // const getGroupFields = (id) => {
  //   getById(id, setProductField);
  // };
  console.log(Product);
  console.log(group);

  // useEffect(() => {
  //   getGroup();
  // }, []);
  // const group = [
  //   { label: 'DA', year: 1994 },
  //   { label: 'TM', year: 1972 },
  //   { label: 'SH', year: 1974 },
  //   { label: 'AGENT', year: 2008 }
  // ];

  // const Product = [
  //   { label: 'SBI CSP', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
  //   { label: 'HDFC', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
  //   { label: 'AXIS', field: ['Name', 'Aadhar', 'Pan', 'Phone'] },
  //   { label: 'IOB', field: ['Name', 'Aadhar', 'Pan', 'Phone'] }
  // ];

  function createData(group, product, create, edit, update, remove, approve, download) {
    return { group, product, create, edit, update, remove, approve, download };
  }

  const [rows, setRows] = React.useState([]);
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  const handleAddField = () => {
    if (PostData.group_id === "") {
      setErrGrp(true)
    }
    else if (Access.product_id === '') {
      setErrProduct(true)
    }
    else {
      setRows([...rows, createData(
        PostData.group_name,
        Access.product_name,
        Access.actions.Create === true ? 'true' : 'false',
        Access.actions.edit === true ? 'true' : 'false',
        Access.actions.update === true ? 'true' : 'false',
        Access.actions.delete === true ? 'true' : 'false',
        Access.actions.approve === true ? 'true' : 'false',
        Access.actions.download === true ? 'true' : 'false'
      )]);
      setData({ ...Data, fields: [...Data.access, FieldAccess] });
      setPostData({ ...PostData, products: [...PostData.products, Access] })
      setFieldAccess({ Field: null, access: null });
      setDisplayName({ ...display_name, Field: null, access: null });
      setAccess({
        product_id: '',
        product_name: '',
        actions: {
          Create: false,
          delete: false,
          approve: false,
          download: false,
          edit: false,
          update: false
        }
      })
      dataref.current.value = null;
    }
    //console.log('add field', Data);
  };

  const handleSubmit = () => {
    console.log("Post data", PostData);
  };

  return (
    <Grid container xl={12}>
      <Grid item xl={12} lg={12} sm={12} xs={12}>
        <SubCard title="Access Management">
          <Grid container xl={10} spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                value={display_name.group || ''}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  if (option === '') {
                    return '';
                  }
                  return option.name;
                }}
                options={Array.isArray(group) ? group : []}
                renderInput={(params) => <TextField error={ErrGrp} {...params} label="Group" />}
                fullWidth
                onChange={(e, value) => handleChange('group', value)}
              />
              <Typography visibility={ErrGrp ? 'visible' : 'hidden'} color='error'>Field is required</Typography>

            </Grid>

            <Grid item xl={4} md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                value={Access.product_name || ''}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  if (option === '') {
                    return '';
                  }
                  return option.product_name;
                }}
                options={Array.isArray(Product) ? Product : []}
                renderInput={(params) => <TextField error={ErrProduct} {...params} ref={dataref} label="Product" fullWidth />}
                fullWidth
                onChange={(e, value) => handleChange('product', value)}
              />
              <Typography visibility={ErrProduct ? 'visible' : 'hidden'} color='error'>Field is required</Typography>
            </Grid>
          </Grid>

          <Grid container xl={12} spacing={2} sx={{ mt: 1 }} alignItems="center">
            {AccessType.map((item, index) => (

              <Grid item xl={3} md={6} xs={10} key={index}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">{item.name}</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={item.value === "Create" ? Access.actions.Create : item.value === "edit" ? Access.actions.edit : item.value === "update" ? Access.actions.update : item.value === "delete" ? Access.actions.delete : item.value === "approve" ? Access.actions.approve : item.value === "download" ? Access.actions.download : false}
                    defaultValue={false}
                    name="radio-buttons-group"
                    onChange={(e) => handleChange(item.name, e.target.value)}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="True" />
                    <FormControlLabel value={false} control={<Radio />} label="False" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            ))}


            <Grid item xl={2}>
              <Button variant="outlined" color="secondary" onClick={handleAddField}>
                Add access
              </Button>
            </Grid>
          </Grid>

          {/* Table */}

          <TableContainer component={Paper} sx={{ height: 300 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Group</TableCell>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Create</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Update</TableCell>
                  <TableCell align="left">Delete</TableCell>
                  <TableCell align="left">Approve</TableCell>
                  <TableCell align="left">Download</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.product} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.group}
                    </TableCell>
                    <TableCell align="left">{row.product}</TableCell>
                    <TableCell align="left">{row.create}</TableCell>
                    <TableCell align="left">{row.edit}</TableCell>
                    <TableCell align="left">{row.update}</TableCell>
                    <TableCell align="left">{row.remove}</TableCell>
                    <TableCell align="left">{row.approve}</TableCell>
                    <TableCell align="left">{row.download}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" sx={{ mt: 2, width: '100%' }} justifyContent="flex-end">
            <Button variant="contained" size="small" color="secondary" sx={{ width: 'fit-content' }} onClick={handleSubmit}>
              Provide Access
            </Button>
          </Stack>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default AccessManagement;
