import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getApplications, updateApplicationStatus } from '../../api/applicationApi';
import { Application, Status } from '../../types/types';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';






const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '15px',
    boxShadow: '0px 10px 35px rgba(50, 50, 93, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.07)',
    textAlign: 'left', 
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  closeButton: {
    marginTop: '20px', // Add some margin to the top of the button
  },
  root: {
    '& .MuiDataGrid-root .MuiDataGrid-footer': {
      position: 'relative',
      right: '0',
      bottom: '0',
    },
  },
});

const ApplicationManagement = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await getApplications();
      const formattedData = data.map((application: Application) => ({
        ...application,
        id: application._id,
        dateOfBirth: new Date(application.dateOfBirth).toLocaleDateString(),
      }));
      setApplications(formattedData);
    };
    fetchApplications();
  }, []);

  const handleOpen = (application: Application) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleStatusChange = async (id: string, status: Status) => {
    await updateApplicationStatus(id, status);
    setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async (id: string) => {
    try {
      await updateApplicationStatus(id, Status.Accepted);
      // Refetch applications or update state here
    } catch (error) {
      console.error('Error updating application: ', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateApplicationStatus(id, Status.Rejected);
      // Refetch applications or update state here
    } catch (error) {
      console.error('Error updating application: ', error);
    }
  };



const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130 },
    { field: 'placeOfBirth', headerName: 'Place of Birth', width: 130 },
    { field: 'motivation', headerName: 'Motivation', width: 200 },
    { field: 'cv', headerName: 'CV', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Tooltip title="Accept">
            <IconButton onClick={() => handleStatusChange(params.id as string, Status.Accepted)} color="primary">
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject">
            <IconButton onClick={() => handleStatusChange(params.id as string, Status.Rejected)} color="secondary">
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton onClick={() => handleOpen(params.row)} color="default">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: any) => {
        let color;
        switch (params.value) {
          case Status.Accepted:
            color = 'green';
            break;
          case Status.Pending:
            color = 'black';
            break;
          case Status.Rejected:
            color = 'red';
            break;
          default:
            color = 'black';
        }
        return <strong style={{ color }}>{params.value}</strong>;
      },
    },
  ];


  return (
    <div style={{ height: 400, width: '100%' }} className={classes.root}>
      <h1 style={{ marginBottom: '20px' }}>They applied for training in dog cosmetics</h1>
      <DataGrid rows={applications}
       columns={columns}
       className={classes.grid}
       checkboxSelection
         />
         <Button component={RouterLink} to="/dashboard" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                Back to Dashboard
            </Button>
    {open && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {selectedApplication?.firstName} {selectedApplication?.lastName}
            </Typography>
            <Typography color="textSecondary">
              <strong>Date of Birth:</strong> {selectedApplication?.dateOfBirth}
            </Typography>
            <Typography color="textSecondary">
              <strong>Place of Birth:</strong> {selectedApplication?.placeOfBirth}
            </Typography>
            <Typography color="textSecondary">
              <strong>Motivation:</strong> {selectedApplication?.motivation}
            </Typography>
            <Typography color="textSecondary">
              <strong>CV:</strong> <a href={selectedApplication?.cv}>Link</a>
            </Typography>
            <Typography color="textSecondary">
              <strong>Email:</strong> {selectedApplication?.email}
            </Typography>
            <Typography color="textSecondary">
              <strong>Phone Number:</strong> {selectedApplication?.phoneNumber}
            </Typography>
            <Button autoFocus onClick={handleClose} className={classes.closeButton}>
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationManagement;