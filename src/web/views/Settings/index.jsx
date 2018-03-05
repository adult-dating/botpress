import React from 'react'
import { Form, FormGroup, Button, Panel, Grid, Row, Col, ControlLabel, Nav, NavItem } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import ContentWrapper from '~/components/Layout/ContentWrapper'
import PageHeader from '~/components/Layout/PageHeader'
import SettingsInput from './input'

export default class SettingsView extends React.Component {
  state = {
    loading: true,
    settingsByModule: {},
    currentSettings: {},
    isChanged: false
  }

  componentDidMount() {
    axios
      .get('/api/settings')
      .then(({ data }) => {
        this.setState({ settingsByModule: data })
        this.setCurrentModuleSettings(data, this.props.location)
      })
      .finally(() => this.setState({ loading: false }))
  }

  componentWillReceiveProps(nextProps) {
    this.setCurrentModuleSettings(this.state.settingsByModule, nextProps.location)
  }

  setCurrentModuleSettings(settingsByModule, location) {
    this.setState({ currentSettings: settingsByModule[this.currentModuleName(location)], isChanged: false })
  }

  currentModuleName = location => location.hash.substring(1)

  handleSave = e => {
    e.preventDefault()
    const settingPairs = _.map(this.state.currentSettings, ({ value }, name) => [name, value || null])
    axios
      .post(`/api/settings/${this.currentModuleName(this.props.location)}`, _.fromPairs(settingPairs))
      .then(() => this.setState({ isChanged: false }))
  }

  render() {
    const { settingsByModule, currentSettings, isChanged, loading } = this.state
    if (loading) {
      return null
    }

    if (!settingsByModule[this.currentModuleName(this.props.location)]) {
      return <Redirect to="/settings#core" />
    }

    const updateSetting = (name, value) => {
      const settings = this.state.currentSettings
      return this.setState({ currentSettings: { ...settings, [name]: { ...settings[name], value } }, isChanged: true })
    }

    return (
      <Grid fluid>
        <PageHeader>
          <span>Settings</span>
        </PageHeader>
        <Row>
          <Col xs={3} md={2}>
            <Nav bsStyle="pills" stacked style={{ marginTop: '20px' }}>
              {Object.keys(settingsByModule).map(name => (
                <NavItem key={name} href={`/settings#${name}`} active={location.hash === `#${name}`}>
                  {name}
                </NavItem>
              ))}
            </Nav>
          </Col>
          <Col xs={9} md={10}>
            <ContentWrapper>
              <Panel>
                <Panel.Body>
                  {Object.keys(currentSettings).length === 0 ? (
                    'No editable settings found for this module'
                  ) : (
                    <Form horizontal onSubmit={this.handleSave}>
                      {_.map(currentSettings, (setting, name) => (
                        <FormGroup key={name} controlId={`formHorizontal${setting}`}>
                          <Col componentClass={ControlLabel} md={3} style={{ wordWrap: 'break-word' }}>
                            {setting.type === 'bool' ? null : `${name}${setting.required ? ' *' : ''}`}
                          </Col>
                          <Col md={9}>
                            <SettingsInput setting={setting} name={name} updateSetting={updateSetting} />
                          </Col>
                        </FormGroup>
                      ))}
                      <FormGroup>
                        <Col mdOffset={3} md={9}>
                          <Button type="submit" disabled={!isChanged}>
                            Save & Restart Bot
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  )}
                </Panel.Body>
              </Panel>
            </ContentWrapper>
          </Col>
        </Row>
      </Grid>
    )
  }
}
