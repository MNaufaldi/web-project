import React from 'react';
import { Modal } from 'semantic-ui-react';
import CreatePost from './CreatePost';

class CreatePostModal extends React.Component {
  state = {
    modalOpen: false
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  
  render(){
    return(
      <a className="item" onClick={this.handleOpen} >
        Create New Post
          <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon>
          <Modal.Header>Create New Post</Modal.Header>
          <Modal.Content>
            <CreatePost handler={this.handleClose} />
          </Modal.Content>
        </Modal>
      </a>
    )
  }
}

export default CreatePostModal;