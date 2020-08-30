import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import './ProviderRegister.css';
import {default as RSelect} from 'react-select';
import makeAnimated from 'react-select/animated';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import data from '../../assets/businessTypes.json';
import data1 from '../../assets/businessType2.json';
import cities from '../../assets/city.json';
import {
    Container,
    InputLabel, Icon,
    StepLabel, Step, ExpansionPanelSummary,
    Stepper, TextField, Grid, Typography,
    Paper, Select, Avatar,
    MenuItem, Chip, ExpansionPanel, ExpansionPanelActions,
    Snackbar, Button, ExpansionPanelDetails, InputAdornment, IconButton
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { history, store } from '../../store';
import log from '../../utils/logger.service';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Multiselect } from 'multiselect-react-dropdown';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { enableRipple } from '@syncfusion/ej2-base';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import GroupIcon from '@material-ui/icons/Group';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

enableRipple(true);

//from ramids
const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ],
}];



export default class ProviderRegister extends React.Component {
    constructor(props) {
        super();
        console.log("cities ",cities);
        this.state = {
            activeStep: 0,
            steps: ['Partner Details', 'Organization Details', 'Services Details', 'Service Type Details'],
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            City: '',
            AllCities: cities,
            Fees: '',
            ALine1: '',
            ALine2: '',
            PinCode: '',
            // countries: [],
            businessList: ['Business Incorporation', 'GST Service', 'Startup Serices', 'Legal Complaince Service', 'Tax Returns', 'Goverment Registration', 'Trademark', 'Miscelleneous Services'],
            individualList: ['Tax returns', 'TDS', 'Legal', 'Miscelleneous Services'],
            businessList1: [
                { value: 'Business Incorporation', label: 'Business Incorporation' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
            ],
            countries: [
                { id: 1, name: 'Australia', hasChild: true, expanded: true },
                { id: 2, pid: 1, name: 'New South Wales' },
                { id: 3, pid: 1, name: 'Victoria' },
                { id: 4, pid: 1, name: 'South Australia' },
                { id: 6, pid: 1, name: 'Western Australia' },
                { id: 7, name: 'Brazil', hasChild: true },
                { id: 8, pid: 7, name: 'Paraná' },
                { id: 9, pid: 7, name: 'Ceará' },
                { id: 10, pid: 7, name: 'Acre' },
                { id: 11, name: 'China', hasChild: true },
                { id: 12, pid: 11, name: 'Guangzhou' },
                { id: 13, pid: 11, name: 'Shanghai' },
                { id: 14, pid: 11, name: 'Beijing' },
                { id: 15, pid: 11, name: 'Shantou' },
                { id: 16, name: 'France', hasChild: true },
                { id: 17, pid: 16, name: 'Pays de la Loire' },
                { id: 18, pid: 16, name: 'Aquitaine' },
                { id: 19, pid: 16, name: 'Brittany' },
                { id: 20, pid: 16, name: 'Lorraine' },
                { id: 21, name: 'India', hasChild: true },
                { id: 22, pid: 21, name: 'Assam' },
                { id: 23, pid: 21, name: 'Bihar' },
                { id: 24, pid: 21, name: 'Tamil Nadu' },
                { id: 25, pid: 21, name: 'Punjab' }
            ],

            field: { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
            indNodes: [],

            busNodes: [],
                 
            indChecked: [],
            indExpanded: [],
            busChecked: [],
            busExpanded: [],
            checked: [],
            expanded: [],
            selectedBusinesses: [],
            services: [],
            servivesList: [],
            selectedServices: [],
            actualServices: [],
            expertise: [],
            expertiseList: [],
            confirmPassword: '',
            phoneNumber: '',
            country_code: '+91',
            errorMessage: '',
            OrgName: '',
            base64: '',
            OrgAddress: '',
            OrgPINType: '',
            OrgCountry: 'India',
            OrgCity: 'Please Select you City',
            selectedCountry: '',
            importedCity:[],
            OrgRegNumber: '',
            OrgServiceType: '',
            OrgExpertise: [],
            open: false,
            showAlert: false,
            value: 0,
            errors: {
                firstName: '',
                lastName: '',
                OrgName: '',
                OrgAddress: '',
                OrgCountry: '',
                OrgRegNumber: '',
                OrgPINType: '',
                password: '',
                email: '',
                confirmPassword: '',
                phoneNumber: ''
            },
        }
    }

    name = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            this.setState({
                base64: reader.result
            });
        };
    }

    classes = makeStyles({
        root: {
            flexGrow: 1,
        },
    });

    //   const [value, setValue] = React.useState(0);

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleDelete = (name) => {
        if(this.state.services.length === 1) {
            this.setState({
                showAlert: true
            })
            return null;
        }
        this.setState({
            services: this.state.services.filter(item=> item.name !== name.name)
        })
    }

    


    change = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'firstName':
                errors.firstName = value.length < 3 ? 'First Name should be 3 characters long' : null;
                break;
            case 'lastName':
                errors.lastName = value.length < 3 ? 'Last name should be 3 characters long' : null;
                break;
            case 'email':
                errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                break;
            case 'password':
                errors.password = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? '' : 'Password should be atleast 7 characters with alphanumeric characters';
                break;
            case 'confirmPassword':
                errors.confirmPassword = (this.state.password === value) ? '' : 'Confirm Password should be equal to password';
                break;
            case 'phoneNumber':
                errors.phoneNumber = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '' : 'Invalid phone number.';
                break;
            case 'OrgName':
                errors.OrgName = value.length < 3 ? 'Organization name should be 3 characters long' : '';
                break;
            case 'OrgAddress':
                errors.OrgAddress = value.length < 3 ? 'Ivalid Organization address' : '';
                break;
            case 'OrgRegNumber':
                errors.OrgRegNumber = value.length ? '' : 'Organization registration number is required';
                break;
            case 'OrgPINType':
                errors.OrgPINType = value.length ? '' : 'PIN type is required';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            return null;
        });
    }

    componentDidMount() {
        log('User is on Provider Register Page')
        document.title = 'Yolo- Partner Register';
        this.props.getFinancialServiceList();
        this.props.getBusinessTypeList();
        this.props.getCountriesList();
	this.setState({
            indNodes: data
        });
        this.setState({
            busNodes: data1
        })

        this.setState({
            AllCities: cities
            
        })

        
        store.subscribe(() => {
            this.setState({
                services: store.getState().getFinancialService.success
            });
            this.setState({
                expertiseList: store.getState().getBusinessTypes.success
            });
            this.setState({
                countries: store.getState().getCountries.countries
            })
        });
        setTimeout(() => {
            this.state.services.map((item) => {
                var joined = this.state.servivesList.concat(item.name);
                this.setState({ servivesList:[...new Set(joined)]  });

            });
            this.setState({expertise: Array.from(new Set(this.state.expertiseList.map(a=>a.name)))
            .map(name=>{
                return this.state.expertiseList.find(a=>a.name === name)
            })})

        }, 5000);
        this.setState();
        this.CitySelect();
    }
    storeSelectedservices = (value) => {
       
        if (value.length === 0) {
                    this.setState({
                        showAlert: true

                    })
                    return null;
                }
        else{
            this.setState({actualServices: Array.from(new Set(value.map(a=>a)))
                .map(name=>{
                 return this.state.services.find(a => a.name === name)
             })})
             this.setState({showAlert:false});
        }

        
    }

    


    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    handleAccessCode = (e) => {
        this.setState({ country_code: e.target.getAttribute('data-value') });
    }

    CitySelect = () => {
        var join =[]
        this.state.AllCities.map((item)=> {
            if (item.country === this.state.OrgCountry)
            {
                 join.push(item)
                  this.setState({importedCity:join})
                
            }
        })
      }

    handleCountrySelect = (e) => {
       
        this.setState({
            OrgCountry: e.target.getAttribute('data-value'),
            selectedCountry:e.target.getAttribute('data-value')
        })

        setTimeout(() => {
            this.CitySelect()

        }, 1000);

        

       
    }

    handleCitySelect = (e) => {
      this.setState({
        OrgCity: e.target.getAttribute('data-value'),
        City: e.target.getAttribute('data-value')
      })

      
     
    }

    handleSelectedexpertise = (e, value) => {
        this.setState({ OrgExpertise: value });
        
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleClick = () => {

    }

    createOrganization = () => {
        this.props.registerProvider(
            this.state.firstName + " " + this.state.lastName,
            this.state.password, this.state.email, this.state.phoneNumber,
            this.state.Fees,this.state.City,
            this.state.OrgCountry,this.state.ALine1,this.state.ALine2 ,
            this.state.PinCode,this.state.OrgName,
            this.state.OrgAddress, this.state.OrgRegNumber,
            this.state.OrgPINType, this.state.actualServices,
            this.state.base64, this.state.OrgExpertise,
	    this.state.indChecked, this.state.busChecked
        );
        store.subscribe(() => {
            if (store.getState().registerProvider.error) {
                this.setState({ open: true });
                this.setState({ errorMessage: store.getState().registerProvider.error })
            } else {
                history.push('/provider/login');
            }

        })
    }

    handleSelectedservices = (event, value) => {
        this.setState({ selectedServices: value });
        this.storeSelectedservices(value);
    }


    renderMultiSelect = (options) => {
        const animatedComponents = makeAnimated();
        return (
            <RSelect
                className="multi-select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.multiSelectGetValues}>
            </RSelect>
        );
    }

    multiSelectGetValues = (...vv) => {
        
        this.setState({
            selectedBusinesses: vv[0]
        });
    }

 businessTreeCheck = () => {
        return (
            <CheckboxTree
                nodes={this.state.busNodes}
                checked={this.state.busChecked}
                expanded={this.state.busExpanded}
                onCheck={checked => this.setState({ busChecked: checked })}
                onExpand={expanded => this.setState({ busExpanded: expanded })}
                icons={{
                    check: <span className="rct-icon rct-icon-check" />,
                    uncheck: <span className="rct-icon rct-icon-uncheck" />,
                    halfCheck: <span className="rct-icon rct-icon-half-check" />,
                    expandClose: <span className="rct-icon rct-icon-expand-close" />,
                    expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                    parentClose: null,
                    parentOpen: null,
                    leaf: null,
                }}
            />
        );
    }
    
    indTreeCheck = () => {
        return (
            <CheckboxTree
                nodes={this.state.indNodes}
                checked={this.state.indChecked}
                expanded={this.state.indExpanded}
                onCheck={checked => this.setState({ indChecked: checked })}
                onExpand={expanded => this.setState({ indExpanded: expanded })}
                icons={{
                    check: <span className="rct-icon rct-icon-check" />,
                    uncheck: <span className="rct-icon rct-icon-uncheck" />,
                    halfCheck: <span className="rct-icon rct-icon-half-check" />,
                    expandClose: <span className="rct-icon rct-icon-expand-close" />,
                    expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                    parentClose: null,
                    parentOpen: null,
                    leaf: null,
                }}
            />
        );
    }


    getStepperContent = () => {

       
        if(this.state.activeStep === 3) {
            return(
                <Paper elevation={3} style={{ padding:50, minHeight: 500 }}>
                    <h4>Please provide your service type details</h4>

                    <div style={{height: "10px",display: "block"}}></div>

                    <GridContainer>
                            <GridItem>
                            <ExpansionPanel style={{width: "100%"}}>
                        <ExpansionPanelSummary expandIcon={<Icon className="fa fa-sort-desc" aria-hidden="true"/>}>
                            <Typography>{"For Individual"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelSummary >
                            {   
                                 this.indTreeCheck()
                                
                            }
                           
                        </ExpansionPanelSummary>
                    </ExpansionPanel>
                            </GridItem>
                        </GridContainer>
                        <div style={{height: "10px",display: "block"}}></div>

                        <GridContainer>
                            <GridItem>
                            <ExpansionPanel style={{width: "100%"}}>
                        <ExpansionPanelSummary expandIcon={<Icon className="fa fa-sort-desc" aria-hidden="true"/>}>
                            <Typography>{"For business"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelSummary>
                            <div>
                            {
                                this.businessTreeCheck()
                            }
                            </div>
                        </ExpansionPanelSummary>
                    </ExpansionPanel>
                            </GridItem>
                        </GridContainer>
                
                        <div style={{height: "30px",display: "block"}}></div>
                <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} 
                        style={{marginRight:30}} variant="outlined"
                    >Back</Button>
                    <Button onClick={this.handleReset} 
                        variant="outlined" 
                        color="secondary" 
                        style={{marginRight:30}}>Reset Form
                    </Button>
                    <Button onClick={this.createOrganization} 
                        variant="outlined" 
                        color="primary">Create your Provider Account
                    </Button>
                </Paper>
            )
        }
        if (this.state.activeStep === 2) {
            return (
                <Paper elevation={3} style={{ padding:50, minHeight: 500 }}>
                    <h4>Enter your Organization Services</h4>
                    <div className={this.classes.root}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Select your service Type" />
                            <Tab label="Select your Expertise" />
                        </Tabs>
                    </div>
                    {
                        this.state.value !== 1 ?
                        <div style={{ display: 'inline-flex', marginBottom: 50 }}>
                        <div>
                            
                                {
                                    this.state.showAlert ? <Alert severity="warning">Cannot delete. Atleast one expertise required</Alert> : null
                                }
                                
                                <br/>
                                <br/>
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        value={this.state.selectedServices}
                                        options={this.state.servivesList}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option}
                                        onChange={(event, value) => this.handleSelectedservices(event, value)}
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option}
                                            </React.Fragment>
                                        )}
                                        className = "dropDown"
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="Select your service Type" placeholder="services" />
                                        )}
                                    />
                        </div>
                        <br/><br/>
                    </div>: <div style={{ display: 'inline-flex', marginBottom: 50 }}>
                        <div>
                            <br/>
                            <br/>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                value={this.state.OrgExpertise}
                                options={this.state.expertise}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => this.handleSelectedexpertise(event, value)}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </React.Fragment>
                                )}
                                className = "dropDown"
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Please Select your Expertise" placeholder="Expertise" />
                                )}
                            />
                        
                        </div>
                    </div>
                    }
                    <br/>
                   <br />
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack} style={{ marginRight: 30 }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleNext} style={{ marginRight: 30 }}>
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Paper>
            )
        } if (this.state.activeStep === 0) {
            return (
                <Paper elevation={3} style={{ padding:50, minHeight: 500 }}>
                    <h4>Please provide your personal details</h4>
                    <Container maxWidth="sm" style={{ marginBottom: 30 }}>
                        <form noValidate autoCapitalize="off">
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <span style={{float:"left"}}>First Name <sup style={{color:"red"}}>*</sup></span>
                                <TextField
                                id="firstName"
                                placeholder="Enter First Name.."
                                fullWidth
                                type="text"
                                required
                                name="firstName"
                                
                                error={this.state.errors.firstName}
                                helperText={this.state.errors.firstName}
                                autoFocus
                                onChange={(e) => this.change(e)}
                                value={this.state.firstName}
                                variant="outlined"
                                InputProps={{
                                    endAdornment:
                                    <InputAdornment position="end">
                                      <PermIdentityIcon/>
                                    </InputAdornment>,
                                  }}
                            />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}> 
                                <span style={{float:"left"}}>Last Name <sup style={{color:"red"}}>*</sup></span>
                                <TextField
                                id="lastName"
                                placeholder="Enter Last Name"
                                fullWidth
                                type="text"
                                required
                                name="lastName"
                                error={this.state.errors.lastName}
                                helperText={this.state.errors.lastName}
                                onChange={(e) => this.change(e)}
                                value={this.state.lastName}
                                variant="outlined"
                                InputProps={{
                                    endAdornment:
                                    <InputAdornment position="end">
                                      <GroupIcon/>
                                    </InputAdornment>,
                                  }}
                            />
                                </GridItem>
                            </GridContainer>
                            <div style={{height: "10px",display: "block"}}></div>
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                            <span style={{float:"left"}}>Email Address <sup style={{color:"red"}}>*</sup></span>
                            <TextField
                                id="email"
                                placeholder="Enter Email Address"
                                fullWidth
                                type="email"
                                required
                                name="email"
                                error={this.state.errors.email}
                                helperText={this.state.errors.email}
                                onChange={(e) => this.change(e)}
                                value={this.state.email}
                                variant="outlined"
                                InputProps={{
                                    endAdornment:
                                    <InputAdornment position="end">
                                      <MailIcon/>
                                    </InputAdornment>,
                                  }}
                            />
                            </GridItem>
                            </GridContainer>
                            
                            <div style={{height: "10px",display: "block"}}></div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                <span style={{float:"left"}}>Password <sup style={{color:"red"}}>*</sup></span>

                                <TextField
                                id="password"
                                placeholder="Enter Password"
                                fullWidth
                                type="password"
                                required
                                name="password"
                                error={this.state.errors.password}
                                helperText={this.state.errors.password}
                                onChange={(e) => this.change(e)}
                                value={this.state.password}
                                variant="outlined"
                                
                                      
                            />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                <span style={{float:"left"}}>Re-Enter Password <sup style={{color:"red"}}>*</sup></span>

                                <TextField
                                id="confirmPassword"
                                placeholder="Re-enter Password"
                                fullWidth
                                type="password"
                                required
                                name="confirmPassword"
                                error={this.state.errors.confirmPassword}
                                helperText={this.state.errors.confirmPassword}
                                onChange={(e) => this.change(e)}
                                value={this.state.confirmPassword}
                                variant="outlined"
                            />
                                </GridItem>

                            </GridContainer>
                            
                           
                            <div style={{height: "10px",display: "block"}}>
                            </div>
                       <GridContainer>
                       <GridItem xs={6} sm={6} md={6} >
                       <span style={{float:"left"}}>Phone Number <sup style={{color:"red"}}>*</sup></span>
                       </GridItem>

                       </GridContainer>

                            <GridContainer>

                                <GridItem xs={12} sm={12} md={3} >
                                <Select
                                fullwidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-sßelect"
                                    value={this.state.country_code}
                                    variant="outlined"
                                    style={{ minWidth: 120 }}>
                                    {
                                        (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index) => {
                                            return <MenuItem key={index} value={item.dial_code} onClick={(e) => this.handleAccessCode(e)}>{item.dial_code}</MenuItem>
                                        }) : <span>Loading</span>
                                    }
                                </Select>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={9}> 

                                <TextField
                                    id="phone_number"
                                    placeholder="Enter Phone number.."
                                    name="phoneNumber"
                                    fullWidth
                                    type="number"
                                    error={this.state.errors.phoneNumber}
                                    helperText={this.state.errors.phoneNumber}
                                    autoFocus
                                    required
                                    onChange={(e) => this.change(e)}
                                    value={this.state.phoneNumber}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                          <PhoneIcon/>
                                        </InputAdornment>,
                                      }}
                                />
                                </GridItem>
                            </GridContainer>

                           
                        </form>
                    </Container>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack} style={{ marginRight: 30 }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleNext} style={{ marginRight: 30 }}>
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Paper>
            )
        } if (this.state.activeStep === 1) {
            return (
                <Paper elevation={3} style={{ padding:50, minHeight: 500 }}>
                    <h4>Please provide your Organization Details</h4>
                    <Container maxWidth="sm" style={{ marginBottom: 50 }}>
                        <form noValidate autoCapitalize="off">
                            <GridContainer>
                                <GridItem xs={12} sm={12} md = {12}> 
                                <span style={{float:"left"}}>Organization Name <sup style={{color:"red"}}>*</sup></span>

                                <TextField
                                fullWidth
                                type="text"
                                required
                                placeholder="Enter Organization Name (As per goverment fillings)"
                                id="OrgName"
                                name="OrgName"
                                error={this.state.errors.OrgName}
                                helperText={this.state.errors.OrgName}
                                autoFocus
                                variant="outlined"
                                onChange={(e) => this.change(e)}
                                value={this.state.OrgName}
                            />
                                </GridItem>
                                </GridContainer>
                                <div style={{height: "10px",display: "block"}}></div>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md = {12}>
                                <span style={{float:"left"}}>Organization Address <sup style={{color:"red"}}>*</sup></span>

                                <TextField
                                fullWidth
                                placeholder="Enter Organization Address"
                                type="text"
                                required
                                id="OrgAddress"
                                name="OrgAddress"
                                variant="outlined"
                                error={this.state.errors.OrgAddress}
                                helperText={this.state.errors.OrgAddress}
                                onChange={(e) => this.change(e)}
                                value={this.state.OrgAddress}
                            />
                                </GridItem>
                            </GridContainer>
                            <div style={{height: "10px",display: "block"}}></div>

                           <GridContainer>
                               <GridItem xs={12} sm={12} md={6}>
                               <span style={{float:"left"}}>Fee<sup style={{color:"red"}}>*</sup></span>

                               <TextField
                                fullWidth
                                placeholder="Enter your Fees"
                                type="text"
                                required
                                variant="outlined"
                                id="Fees"
                                name="Fees"
                                onChange={(e) => this.change(e)}
                                value={this.state.Fees}
                            />
                               </GridItem>
                               <GridItem xs={12} sm={12} md={6}>
                               <span style={{float:"left"}}>Pincode<sup style={{color:"red"}}>*</sup></span>

                               <TextField
                                fullWidth
                                placeholder="Enter Your Pincode.."
                                type="text"
                                required
                                id="PinCode"
                                name="PinCode"                                
                                variant="outlined"
                                onChange={(e) => this.change(e)}
                                value={this.state.PinCode}
                            /> 
                               </GridItem>
                           </GridContainer>

                           <div style={{height: "10px",display: "block"}}></div>
                           <GridContainer>
                               <GridItem xs={12} sm={12} md={6}>
                               <span style={{float:"left"}}>Country<sup style={{color:"red"}}>*</sup></span>

                               <Select id="countriesLabel"
                               variant="outlined"
                                labelId="demo-simple-select-label"
                                fullWidth
                                value={this.state.OrgCountry}>
                                {
                                    (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index) => {
                                        return <MenuItem key={index} value={item.name} onClick={(e) => this.handleCountrySelect(e)}>{item.name}</MenuItem>
                                    }) : <span>Loading...</span>
                                }
                            </Select>
                               </GridItem>
                               <GridItem xs={12} sm={12} md={6}>
                               <span style={{float:"left"}}>City<sup style={{color:"red"}}>*</sup></span>
                               <Select id="citiesLabel"
                                labelId="demo-simple-select-label"
                                fullWidth
                                variant="outlined"
                                value={this.state.OrgCity}
                            >
                                         
                                {
                                    (this.state.importedCity && this.state.importedCity.length) ? this.state.importedCity.map((item, index) => {
                                        return <MenuItem key={index} value={item.name} onClick={(e) => this.handleCitySelect(e)}>{item.name}</MenuItem>
                                    }) : <span>Loading...</span>
                                }
                            </Select>

                               </GridItem>
                           </GridContainer>

                           <div style={{height: "10px",display: "block"}}></div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <span style={{float:"left"}}>Address Line 1<sup style={{color:"red"}}>*</sup></span>
                                <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Address Line 1"
                                type="text"
                                required
                                id="ALine1"
                                name="ALine1"
                                onChange={(e) => this.change(e)}
                                value={this.state.ALine1}
                            /> 
                                </GridItem>
                            </GridContainer>

                            <div style={{height: "10px",display: "block"}}></div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <span style={{float:"left"}}>Address Line 2<sup style={{color:"red"}}>*</sup></span>
                                <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Address Line 2"
                                type="text"
                                required
                                id="ALine2"
                                name="ALine2"
                                onChange={(e) => this.change(e)}
                                value={this.state.ALine2}
                            /> 
                                </GridItem>
                            </GridContainer>

                            <div style={{height: "10px",display: "block"}}></div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <span style={{float:"left"}}>Organization Registation Number<sup style={{color:"red"}}>*</sup></span>
                                <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your Organization Registation Number"
                                type="text"
                                required
                                id="OrgRegNumber"
                                name="OrgRegNumber"
                                error={this.state.errors.OrgRegNumber}
                                helperText={this.state.errors.OrgRegNumber}
                                onChange={(e) => this.change(e)}
                                value={this.state.OrgRegNumber}
                            />
                                </GridItem>
                            </GridContainer>

                            <div style={{height: "10px",display: "block"}}></div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                <span style={{float:"left"}}>Type of Registration<sup style={{color:"red"}}>*</sup></span>
                                <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter Type of Registration"
                                type="text"
                                required
                                name="OrgPINType"
                                error={this.state.errors.OrgPINType}
                                helperText={this.state.errors.OrgPINType}
                                onChange={(e) => this.change(e)}
                                style={{ marginBottom: 40 }}
                                value={this.state.OrgPINType}
                            />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem>
                                <span style={{float:"left"}}>Provide Your Profile Picture</span>
                                <input
                                    accept="image/*"
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e) => { this.name(e) }}
                                />
                                </GridItem>
                            </GridContainer>
                            
                           
                        </form>
                    </Container>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}
                        style={{ marginRight: 30 }}
                        variant="outlined"
                    >
                        Back
                </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleNext} style={{ marginRight: 30 }}>
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Paper>
            )
        }
    }

    render() {
        return (
            <div >
                <HeaderContainer />
                <Paper className="stepperShrink">
                    <Stepper activeStep={this.state.activeStep} alternativeLabel elevation={0}>
                        {
                            this.state.steps.map((items, index) => {
                                return (
                                    <Step key={items}>
                                        <StepLabel>{items}</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                </Paper>
                <div className="shrink" >
                    <GridContainer spacing={0} direction="column" alignItems="center" justify="center">
                        <GridItem xs={12} sm ={12} md = {8}> 
                        {
                        this.getStepperContent()
                    }
                        </GridItem>
                    </GridContainer>
                    
                    
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e, r) => this.handleClose(e, r)}
                    message={this.state.errorMessage}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={(e, r) => this.handleClose(e, r)}>
                                Hide
                            </Button>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}