import React from 'react';
/* material-ui/core */
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
/* other files */
import CardGrid from './CardGrid'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SimpleTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Aula A" {...a11yProps(0)} />
                    <Tab label="Aula B" {...a11yProps(1)} />
                    <Tab label="Aula C" {...a11yProps(2)} />
                    <Tab label="Aula D" {...a11yProps(0)} />
                    <Tab label="Aula e" {...a11yProps(1)} />
                    <Tab label="Aula f" {...a11yProps(2)} />
                    <Tab label="Aula g" {...a11yProps(0)} />
                    <Tab label="Aula h" {...a11yProps(1)} />
                    <Tab label="Aula i" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {/* <CardHeader className="headerCard" title="New room"/> */}
                {CardGrid()}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {CardGrid()}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {CardGrid()}
            </TabPanel>
        </div>
    );
}