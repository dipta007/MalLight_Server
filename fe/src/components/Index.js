import React, { Component, useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import LoadingOverlay from 'react-loading-overlay';
import { fasta } from './placeholder';
import axios from 'axios';
import Header from './Header';
import AboutModal from './AboutModal';
import PublicationsModal from './PublicationsModal';
import ContactModal from './ContactModal';
import ExampleModal from './ExampleModal';
import Footer from './Footer';

export default class Index extends Component {
  state = {
    species: 'human',
    fasta: '',
    loading: false,
    protein: '',
    res: '',
    aboutModal: false,
    publicationsModal: false,
    contactModal: false,
    exampleModal: false,
  }

  changeSpecies = ({ target: { value } }) => {
    this.setState({ species: value });
  }

  submit = async () => {
    this.setState({ loading: true, protein: '', res: '' });
    const { species, fasta, spd3 } = this.state;
    const { data } = await axios.post('http://13.58.188.133:4774/get_malonylation', {
      fasta,
      spd3,
      species,
    });
    const ret = data.split('\n');
    const protein = ret[0];
    const res = ret[1];

    this.setState({ loading: false, protein, res });
  }

  toggleModal = (type) => {
    const now = this.state[type];
    this.setState({
      [type]: !now,
    });
  }

  render() {
    const { species, loading, protein, res, aboutModal, publicationsModal, contactModal, exampleModal } = this.state

    let result = protein.split('').map((p, i) => {
      if (p === 'K') {
        if (res[i] === '1') return `<span class="red">${p}</span>`
        else return `<span class="green">${p}</span>`
      }
      else return `${p}`
    }).join("");
    result = `<h6>${result}</h6>`;

    let indices = res.split('').map((p, i) => {
      if (res[i] === '1') return i;
    }).filter(p => p).join(' , ');
    if (!res.length) {
      indices = "No Malonylation site";
    }

    return (
      <>
        <LoadingOverlay
          active={loading}
          spinner
          text='Fetching Result, It will take some time. Do not close or press back'
        >
          <Header toggle={this.toggleModal} />
          <div className="container-me">
            <h1>Mal-Light:</h1>
            <h3>Enhancing Lysine Malonylation Sites Prediction Problem Using Evolutionary-based Features.</h3>
            <hr />
            <div className="body">
              <p>Enter or copy/paste query protein in&nbsp;
              <a href="https://github.com/Wakiloo7/Mal-Light/blob/master/FASTA%20format.txt">Fasta</a>
              &nbsp;format
              (<span onClick={() => this.toggleModal('exampleModal')} className="like-anchor">Example</span>)
              </p>
              

              <div className="input-area">
                <TextareaAutosize
                  onChange={(e) => this.setState({ fasta: e.target.value })}
                  value={this.state.fasta}
                  aria-label="fasta"
                  placeholder={fasta}
                  rowsMin={10}
                  rowsMax={10}
                  className="input-box-pssm"
                />
              </div>

              <FormControl component="fieldset" className="margin-top-20">
                <FormLabel component="legend">Select Species</FormLabel>
                <RadioGroup aria-label="position" name="position" value={species} onChange={this.changeSpecies} row>
                  <FormControlLabel
                    value="human"
                    control={<Radio color="primary" />}
                    label="Human"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="mice"
                    control={<Radio color="primary" />}
                    label="Mouse"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="combined"
                    control={<Radio color="primary" />}
                    label="Combined"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>

              <Button variant="contained" color="primary" className="margin-top-20" onClick={this.submit}>
                Submit
              </Button>

              {!!protein.length && (
                <>
                  <div className="result-container" dangerouslySetInnerHTML={{ __html: result }} />
                  <div>
                    <h4>Malonylation Site Indexes (0-based indexing)</h4>
                    <p>{indices}</p>
                  </div>
                </>
              )}

              <div style={{ textAlign: 'left', width: '100%', marginTop: '20px' }}>
                <h4>References:</h4>
                <ul>
                  <li>IEEE Access (Submitted)</li>
                </ul>
              </div>


            </div>
          </div>
          <Footer />
        </LoadingOverlay>
        <AboutModal open={aboutModal} toggle={this.toggleModal} />
        <PublicationsModal open={publicationsModal} toggle={this.toggleModal} />
        <ContactModal open={contactModal} toggle={this.toggleModal} />
        <ExampleModal open={exampleModal} toggle={this.toggleModal} />
      </>
    )
  }
}
