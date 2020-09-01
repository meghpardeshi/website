import React from 'react';
import * as getApprovedProviders from '../actions/getAllProvidersActions';
import ProviderProfile from '../components/ProviderProfile/ProviderProfile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
 class ProviderProfileContainer extends React.Component {
    render() {
        return(
            <ProviderProfile 
            getAllProvider = {this.props.getAllProvider}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getAllProvider: getApprovedProviders.getAllProviders
    }, dispatch)
} 

export default connect(null, mapDispatchToProps)(ProviderProfileContainer)