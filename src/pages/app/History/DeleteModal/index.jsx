import { Modal, Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addResult, deleteResult } from '../../../../actions/totalResult'
import api from "../../../../api"

class modal extends React.Component {
  state = {
    ModalText: 'Really want to delete is job? This job cannot be recoverd',
    visible: false,
    confirmLoading: false,
  };

  showModal = (e) => {
    e.preventDefault();
    e.stopPropagation()
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    e.preventDefault();
    e.stopPropagation()
    this.setState({
      ModalText: 'You delete the job successfully',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });

      api.jobs.deleteJob(this.props.jobid)
      .then(res => {console.log(res)
        this.props.handleCancelCallback()
      }
      )

      
    }, 2000);

    
  };

  handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation()
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <>
        <Button type="primary" danger onClick={this.showModal.bind(this)}>
          Delete
        </Button>
        <Modal
          title="Alert"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addResult: bindActionCreators(addResult, dispatch),
    deleteResult: bindActionCreators(deleteResult, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    MapDisplay: state.MapDisplay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(modal);
