import React, {useState} from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddProduct from '../AddProduct/AddProduct';
import EditProduct from '../EditProduct/EditProduct';
import Typography from '@material-ui/core/Typography';

const items = [
    { name: 'manageProduct', label: 'Manage Product', icons: <ViewModuleIcon />, tab: <EditProduct /> },
    { name: 'addProduct', label: 'Add Product', icons: <AddIcon />, tab: <AddProduct /> },
    { name: 'editProduct', label: 'Edit Product', icons: <EditIcon />, tab: <EditProduct /> },
]

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: '0px',
        color: theme.palette.text.secondary,
    },
  }));

const Admin = () => {
    document.title = "Admin Panel";
    const classes = useStyles();
    const [tab, setTab] = useState({
        tabName: '',
        tabComponent: null
    });

    const handleClick = item => {
        const newTab = {...tab};
        newTab.tabName = item.label;
        newTab.tabComponent = item.tab;
        setTab(newTab);
    }

    return (
        <Grid container style={{paddingTop: '3%'}}>
            <Grid item xs={3} style={{color: '#fff', backgroundColor: '#6a8775', padding: '2%'}}>
                <Typography align="left" style={{fontWeight: 600, marginBottom: '10%'}} variant="h4" noWrap>
                    Pure Goods
                </Typography>
                <List disablePadding dense>
                    {items.map(item => {
                        const { label, icons, name, ...rest } = item;
                        
                        return (
                            <ListItem key={name} button {...rest} onClick={() => handleClick(item)}>
                                {icons}
                                <ListItemText> {label}</ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
            <Grid item xs={9}>
                <Paper className={classes.paper} style={{paddingBlock: '15px', backgroundColor: '#eee'}}>
                    <h3>{tab.tabName.length > 0 ? tab.tabName : 'Manage Product'}</h3>
                </Paper>
                <Paper className={classes.paper} style={{backgroundColor: 'skyblue'}}>
                    {tab.tabName.length > 0 ? tab.tabComponent : <EditProduct />}
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Admin;